import { registerPlugin } from '@wordpress/plugins';
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/edit-post';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { SelectControl, RadioControl, Notice } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import OptimizeButton from './OptimizeButton';
import ScoreModal from './ScoreModal';
import '../index.css';

const TONES = [
  { label: 'Explicativo',    value: 'explicativo' },
  { label: 'Jornalístico',   value: 'jornalistico' },
  { label: 'Conversacional', value: 'conversacional' },
  { label: 'Técnico',        value: 'tecnico' },
  { label: 'Institucional',  value: 'institucional' },
];

const RankIASidebar = () => {
  const [tone, setTone]       = useState('explicativo');
  const [focus, setFocus]     = useState('seo');
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState(null);
  const [error, setError]     = useState('');

  const postContent = useSelect(
    (select) => select('core/editor').getEditedPostAttribute('content'),
    []
  );

  const hasKey = window.rankiaData?.hasKey ?? false;

  return (
    <>
      <PluginSidebarMoreMenuItem target="rankia-sidebar">
        RankIA
      </PluginSidebarMoreMenuItem>

      <PluginSidebar name="rankia-sidebar" title="RankIA Optimizer" icon="chart-line">
        <div style={{ padding: '16px' }}>
          {!hasKey && (
            <Notice status="warning" isDismissible={false}>
              Configure sua API key em{' '}
              <a href="/wp-admin/options-general.php?page=rankia-settings">
                Configurações → RankIA
              </a>
            </Notice>
          )}

          <SelectControl
            label="Tom de voz"
            value={tone}
            options={TONES}
            onChange={setTone}
            disabled={loading}
          />

          <RadioControl
            label="Foco"
            selected={focus}
            options={[
              { label: 'SEO', value: 'seo' },
              { label: 'AEO', value: 'aeo' },
              { label: 'GEO', value: 'geo' },
            ]}
            onChange={setFocus}
            disabled={loading}
          />

          {error && (
            <Notice status="error" isDismissible onRemove={() => setError('')}>
              {error}
            </Notice>
          )}

          <OptimizeButton
            content={postContent}
            tone={tone}
            focus={focus}
            loading={loading}
            disabled={!hasKey || loading}
            onStart={() => { setLoading(true); setError(''); setResult(null); }}
            onSuccess={(data) => { setResult(data); setLoading(false); }}
            onError={(msg) => { setError(msg); setLoading(false); }}
          />
        </div>
      </PluginSidebar>

      {result && (
        <ScoreModal
          result={result}
          originalContent={postContent}
          onClose={() => setResult(null)}
        />
      )}
    </>
  );
};

registerPlugin('rankia', { render: RankIASidebar });
