<?php
if ( ! defined( 'ABSPATH' ) ) exit;

class Rankia_API {

    public function init() {
        add_action( 'rest_api_init', [ $this, 'register_routes' ] );
    }

    public function register_routes() {
        register_rest_route( 'rankia/v1', '/optimize', [
            'methods'             => 'POST',
            'callback'            => [ $this, 'optimize' ],
            'permission_callback' => function() {
                return current_user_can( 'edit_posts' );
            },
            'args' => [
                'content' => [
                    'required'          => true,
                    'type'              => 'string',
                    'sanitize_callback' => 'wp_kses_post',
                    'validate_callback' => function( $value ) {
                        return strlen( strip_tags( $value ) ) >= 100;
                    },
                ],
                'tone'  => [ 'type' => 'string', 'default' => 'explicativo' ],
                'focus' => [
                    'type'    => 'string',
                    'default' => 'seo',
                    'enum'    => [ 'seo', 'aeo', 'geo' ],
                ],
            ],
        ] );

        register_rest_route( 'rankia/v1', '/ping', [
            'methods'             => 'GET',
            'callback'            => [ $this, 'ping' ],
            'permission_callback' => function() {
                return current_user_can( 'manage_options' );
            },
        ] );
    }

    public function optimize( WP_REST_Request $request ) {
        $api_key = get_option( 'rankia_api_key', '' );

        if ( empty( $api_key ) ) {
            return new WP_Error(
                'no_api_key',
                'Configure sua API key em Configurações → RankIA.',
                [ 'status' => 403 ]
            );
        }

        $response = wp_remote_post( RANKIA_API_BASE . '/optimize', [
            'timeout' => 65,
            'headers' => [
                'Authorization' => 'Bearer ' . $api_key,
                'Content-Type'  => 'application/json',
            ],
            'body' => wp_json_encode( [
                'content' => $request->get_param( 'content' ),
                'tone'    => $request->get_param( 'tone' ),
                'focus'   => $request->get_param( 'focus' ),
            ] ),
        ] );

        if ( is_wp_error( $response ) ) {
            return new WP_Error(
                'api_error',
                'Erro ao conectar com o RankIA: ' . $response->get_error_message(),
                [ 'status' => 502 ]
            );
        }

        $code = wp_remote_retrieve_response_code( $response );
        $body = json_decode( wp_remote_retrieve_body( $response ), true );

        if ( $code !== 200 ) {
            return new WP_Error(
                'api_error',
                $body['error'] ?? 'Erro desconhecido.',
                [ 'status' => $code ]
            );
        }

        return rest_ensure_response( $body );
    }

    public function ping() {
        $api_key = get_option( 'rankia_api_key', '' );
        if ( empty( $api_key ) ) {
            return rest_ensure_response( [ 'ok' => false, 'message' => 'API key não configurada.' ] );
        }
        return rest_ensure_response( [ 'ok' => true, 'prefix' => substr( $api_key, 0, 12 ) ] );
    }
}
