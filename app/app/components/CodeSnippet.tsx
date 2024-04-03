'use client'

import { cx } from 'class-variance-authority'
import { Highlight, Prism } from 'prism-react-renderer'
import { useEffect, useState } from 'react'
import Icon from './Icon'
import theme from '~/styles/codeSnippetTheme'

export function CodeSnippet(props: { code: any }) {
  const [copied, setCopied] = useState(false)

  const prismLanguageId = !props.code?.language
    ? null
    : languageToPrismId(props.code.language)

  const handleCopy = () => {
    navigator.clipboard.writeText(props.code?.code)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1200)
  }

  useEffect(() => {
    ;(async () => {
      if (prismLanguageId) {
        window.Prism = Prism
        await import(`prismjs/components/prism-${prismLanguageId}`)

        if (window.Prism && typeof window.Prism.highlightAll === 'function') {
          window.Prism.highlightAll()
        }
      }
    })()
  }, [prismLanguageId])

  return (
    <div
      className={cx(
        'codeblock relative mb-10 h-full overflow-hidden rounded-md bg-emphasis-light/5 p-4 pr-12 dark:bg-emphasis-dark',
        `font-mono text-lg`,
      )}
    >
      <div className="absolute right-2 top-2">
        <button
          className={cx(
            'body-s-medium m-xxs flex animate-fade-in items-center gap-xs rounded-[4px] p-3 font-medium transition-all  duration-200',
            'text-tertiary-dark lg:hover:bg-primaryHover-light dark:border-border-dark dark:text-tertiary-dark dark:lg:hover:bg-primaryHover-light',
          )}
          onClick={handleCopy}
        >
          <Icon name={copied ? 'check' : 'copy'} className="h-4 w-4" />
        </button>
      </div>
      <Highlight
        code={props.code?.code?.trim() || ''}
        language={props.code?.language || 'typescript'}
        theme={theme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={cx(className, 'whitespace-break-spaces')}
            style={style}
          >
            {tokens.map((line, index) => {
              const lineProps = getLineProps({ line })
              if (props.code?.highlightedLines?.includes(index + 1)) {
                lineProps.className = 'highlighted'
              }
              return (
                <div key={index} {...lineProps}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              )
            })}
          </pre>
        )}
      </Highlight>
    </div>
  )
}

export default function CodeSnippetBlock(props: { code: any }) {
  return (
    <div className="mt-10">
      <CodeSnippet {...props} />
    </div>
  )
}

function languageToPrismId(language: string) {
  switch (language) {
    case 'bash':
      return 'bash'
    case 'csharp':
      return 'csharp'
    case 'cpp':
      return 'cpp'
    case 'clojure':
      return 'clojure'
    case 'dart':
      return 'dart'
    case 'docker':
      return 'yaml'
    case 'ejs':
      return 'javascript' // Or "markup" for HTML parts.
    case 'elm':
      return 'elm'
    case 'go':
      return 'go'
    case 'graphql':
      return 'graphql'
    case 'haml':
      return 'haml'
    case 'handlebars':
      return 'handlebars'
    case 'javascript':
      return 'javascript'
    case 'json':
      return 'json'
    case 'lua':
      return 'lua'
    case 'markdown':
      return 'markdown'
    case 'markup':
      return 'markup' // For HTML/XML.
    case 'php':
      return 'php'
    case 'python':
      return 'python'
    case 'jsx':
      return 'jsx'
    case 'tsx':
      return 'tsx'
    case 'sql':
      return 'sql'
    case 'toml':
      return 'toml'
    case 'typescript':
      return 'typescript'
    // WebAssembly (wasm) is not directly supported; consider handling separately.
    case 'wasm':
      return null
    case 'yaml':
      return 'yaml'
    default:
      return 'json'
  }
}
