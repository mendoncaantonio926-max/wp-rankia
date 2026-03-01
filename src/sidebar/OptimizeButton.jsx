import { Button, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

export default function OptimizeButton({
  content, tone, focus, loading, disabled, onStart, onSuccess, onError,
}) {
  const handleClick = async () => {
    const plainText = content.replace(/<[^>]+>/g, ' ').trim();

    if (plainText.length < 100) {
      onError('O post precisa ter pelo menos 100 caracteres de conteúdo.');
      return;
    }

    onStart();

    try {
      const data = await apiFetch({
        path: '/rankia/v1/optimize',
        method: 'POST',
        data: { content, tone, focus },
      });
      onSuccess(data);
    } catch (err) {
      onError(err?.message ?? 'Erro ao conectar com o RankIA.');
    }
  };

  return (
    <div style={{ marginTop: '16px' }}>
      <Button
        variant="primary"
        onClick={handleClick}
        disabled={disabled}
        style={{ width: '100%', justifyContent: 'center' }}
      >
        {loading ? (
          <>
            <Spinner style={{ marginRight: '8px' }} />
            Otimizando...
          </>
        ) : (
          'Otimizar Agora'
        )}
      </Button>
    </div>
  );
}
