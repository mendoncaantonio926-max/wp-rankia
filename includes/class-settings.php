<?php
if ( ! defined( 'ABSPATH' ) ) exit;

class Rankia_Settings {

    public function init() {
        add_action( 'admin_menu', [ $this, 'add_menu' ] );
        add_action( 'admin_init', [ $this, 'register_settings' ] );
    }

    public function add_menu() {
        add_options_page(
            'RankIA',
            'RankIA',
            'manage_options',
            'rankia-settings',
            [ $this, 'render_page' ]
        );
    }

    public function register_settings() {
        register_setting( 'rankia_settings_group', 'rankia_api_key', [
            'type'              => 'string',
            'sanitize_callback' => 'sanitize_text_field',
        ] );

        add_settings_section(
            'rankia_main_section',
            'Configuração da API',
            '__return_false',
            'rankia-settings'
        );

        add_settings_field(
            'rankia_api_key',
            'API Key',
            [ $this, 'render_api_key_field' ],
            'rankia-settings',
            'rankia_main_section'
        );
    }

    public function render_api_key_field() {
        $value = get_option( 'rankia_api_key', '' );
        $display = $value ? substr( $value, 0, 12 ) . '••••••••••••' : '';
        ?>
        <input
            type="password"
            name="rankia_api_key"
            value="<?php echo esc_attr( $value ); ?>"
            placeholder="rk_live_..."
            class="regular-text"
            autocomplete="new-password"
        />
        <?php if ( $display ) : ?>
            <p class="description">Chave atual: <code><?php echo esc_html( $display ); ?></code></p>
        <?php endif; ?>
        <p class="description">
            Gere sua API key em
            <a href="https://rankia.com.br/settings" target="_blank">rankia.com.br/settings</a>
            (requer plano Max).
        </p>
        <?php
    }

    public function render_page() {
        if ( ! current_user_can( 'manage_options' ) ) return;
        ?>
        <div class="wrap">
            <h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
            <form method="post" action="options.php">
                <?php
                settings_fields( 'rankia_settings_group' );
                do_settings_sections( 'rankia-settings' );
                submit_button( 'Salvar' );
                ?>
            </form>
        </div>
        <?php
    }
}
