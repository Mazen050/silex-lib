import { ClientConfig } from '../../config'
import { CMS_SETTINGS_SECTION_ID, EleventyPluginOptions, Silex11tyPluginWebsiteSettings } from './index'
import { html } from 'lit-html'
import { addDataSource, createDataSource } from '@silexlabs/grapesjs-data-source'
import { Editor } from 'grapesjs'
import { cmdAddSection } from '../settings'

export default function(editor: Editor, opts: EleventyPluginOptions): void {
  editor.runCommand(cmdAddSection, {
    section: {
      id: CMS_SETTINGS_SECTION_ID,
      label: 'CMS',
      render: () => {
        const settings = (editor.getModel().get('settings') || {}) as Silex11tyPluginWebsiteSettings
        return html`
          <style>
          #settings-${CMS_SETTINGS_SECTION_ID} label {
            display: block;
            margin-bottom: 10px;
          }
          .add-ds-btn {
            width: 30px;
            height: 30px;
            margin-left: auto;
            font-size: 24px;
            background-color: var(--gjs-main-light-color);
          }
          </style>
          <div id="settings-${CMS_SETTINGS_SECTION_ID}" class="silex-hideable silex-hidden">
            <div class="gjs-sm-sector-title">Silex CMS</div>
            <div class="silex-help">
              <p>The <a target="_blank" href="https://github.com/silexlabs/silex-cms">Silex CMS feature</a> integrates with your favorite headless CMS, API or database.</p>
              <p>By adding data sources to your website you activate <a target="_blank" href="https://www.11ty.dev/docs/">11ty static site generator</a> integration. When you wil publish your website, the generated files assume you build the site with 11ty and possibly with Gitlab pages.</p>
            </div>
            <div class="gjs-sm-sector-title">
              Data Sources
              <button
                class="silex-button add-ds-btn"
                title="Add a new data source"
                @click=${async () => {
    const newDataSource = createDataSource()
    addDataSource(newDataSource)
    try {
      await newDataSource.connect()
    } catch (error) {
      console.error('🟡 [site-settings] Data source connection failed:', error)
    }
  }}>
                +
                </button>
            </div>
            ${opts.view?.settingsEl ? (opts.view.settingsEl as () => HTMLElement)() : ''}
            <div class="gjs-sm-sector-title">11ty Config</div>
            <div class="silex-help">
              <p>These settings are used to configure the <a target="_blank" href="https://www.11ty.dev/docs/">11ty static site generator</a> integration.</p>
              <p>Depending on your 11ty configuration, you may need to adjust these settings, it will enable or disable features in Silex.</p>
            </div>
            <div class="silex-help">
              <p>⚠️ You need to reload Silex for these settings to take effect.</p>
            </div>
            <label>
              I18N Plugin
              <input id="i18n-checkbox" type="checkbox" name="eleventyI18n" ?checked=${settings.eleventyI18n || opts.i18nPlugin} ?disabled=${typeof opts.i18nPlugin !== 'undefined'}>
            </label>
            <label>
              Fetch Plugin
              <input type="checkbox" name="eleventyFetch" ?checked=${settings.eleventyFetch || !!opts.fetchPluginSettings} ?disabled=${typeof opts.fetchPluginSettings !== 'undefined'}>
            </label>
            <div class="silex-form__group col2">
            </div>
          </div>
          </div>
          `
      }
    },
    siteOrPage: 'site',
    position: 'last'
  })
}
