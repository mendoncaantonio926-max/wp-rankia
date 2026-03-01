import { Modal, Button } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

const SCORE_LABELS = {
  seo:       { label: 'SEO',      color: '#00D9FF' },
  aeo:       { label: 'AEO',      color: '#A78BFA' },
  geo:       { label: 'GEO',      color: '#34D399' },
  infoGain:  { label: 'InfoGain', color: '#FBBF24' },
  humanity:  { label: 'Humanity', color: '#F87171' },
  finalScore:{ label: 'Final',    color: '#00D9FF' },
};

function ScoreBar({ label, before, after, color }) {
  const diff = after - before;
  const sign = diff > 0 ? '+' : '';
  return (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
        <span style={{ color: '#9CA3AF' }}>{label}</span>
        <span style={{ color: diff > 0 ? '#34D399' : diff < 0 ? '#F87171' : '#9CA3AF', fontWeight: 'bold' }}>
          {before} → {after} ({sign}{diff})
        </span>
      </div>
      <div style={{ background: '#1F2937', borderRadius: '4px', height: '6px', overflow: 'hidden' }}>
        <div style={{ width: `${after}%`, background: color, height: '100%', borderRadius: '4px', transition: 'width 0.5s' }} />
      </div>
    </div>
  );
}

export default function ScoreModal({ result, originalContent, onClose }) {
  const { editPost } = useDispatch('core/editor');

  const before = { seo: 50, aeo: 45, geo: 48, infoGain: 52, humanity: 55, finalScore: 50 };
  const after  = result.scores ?? {};

  const handleApply = () => {
    editPost({ content: result.optimizedContent });
    onClose();
  };

  return (
    <Modal
      title="Resultado da Otimização RankIA"
      onRequestClose={onClose}
      style={{ maxWidth: '640px' }}
    >
      <div style={{ padding: '8px 0' }}>
        <div style={{ background: '#111827', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
          {Object.entries(SCORE_LABELS).map(([key, { label, color }]) => (
            <ScoreBar
              key={key}
              label={label}
              before={before[key] ?? 50}
              after={after[key] ?? 0}
              color={color}
            />
          ))}
        </div>

        {result.keyword && (
          <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '12px' }}>
            Keyword principal: <strong style={{ color: '#E5E7EB' }}>{result.keyword}</strong>
          </p>
        )}

        <div style={{
          maxHeight: '200px', overflowY: 'auto', background: '#F9FAFB',
          border: '1px solid #E5E7EB', borderRadius: '6px', padding: '12px',
          fontSize: '13px', lineHeight: '1.6', color: '#111827', marginBottom: '16px',
        }}
          dangerouslySetInnerHTML={{ __html: result.optimizedContent }}
        />

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <Button variant="tertiary" onClick={onClose}>
            Descartar
          </Button>
          <Button variant="primary" onClick={handleApply}>
            Aplicar ao Post
          </Button>
        </div>
      </div>
    </Modal>
  );
}
