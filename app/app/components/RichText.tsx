import {
  PortableText,
  PortableTextBlock,
  PortableTextComponents,
  PortableTextProps,
  PortableTextTypeComponent,
} from '@portabletext/react'
import {
  ArbitraryTypedObject,
  PortableTextMarkDefinition,
  PortableTextSpan,
} from '@portabletext/types'

import { ptBlockComponents } from './Blocks'

import { getDeepLinkId, getPtComponentId } from '../utils/ids'
import { cx } from 'class-variance-authority'

function getBlockTypes(fieldName?: string) {
  return Object.fromEntries(
    Object.entries(ptBlockComponents || {}).map(([type, Component]) => [
      type,
      ({ value, index }) => (
        <Component
          {...value}
          _blockIndex={index}
          rootHtmlAttributes={{
            'data-block': value._type,
            id: getDeepLinkId({ fieldName, sectionKey: value._key }),
          }}
        />
      ),
    ]),
  ) as Record<string, PortableTextTypeComponent>
}

// @TODO/USER: Customize your rich text rendering styles by modifying classnames here
function createDefaultComponents(
  fieldName?: string,
  usage?: 'default' | 'textPage',
): PortableTextComponents {
  function prepareProps(props: PortableTextProps) {
    if (!fieldName) return {}

    return {
      id: getPtComponentId(
        props.value as PortableTextBlock<
          PortableTextMarkDefinition,
          ArbitraryTypedObject | PortableTextSpan,
          string,
          string
        >,
      ),
    }
  }
  return {
    block: {
      h1: (props) => (
        <h1
          {...prepareProps(props)}
          className={cx({
            'text-3xl': usage === 'default',
            'l-heading': usage === 'textPage',
          })}
        >
          {props.children}
        </h1>
      ),
      h2: (props) => (
        <h2
          {...prepareProps(props)}
          className={cx({
            'text-xl': usage === 'default',
            'm-heading py-4': usage === 'textPage',
          })}
        >
          {props.children}
        </h2>
      ),
      h3: (props) => (
        <h3
          {...prepareProps(props)}
          className={cx({
            uppercase: usage === 'default',
            's-heading  py-4': usage === 'textPage',
          })}
        >
          {props.children}
        </h3>
      ),
      h4: (props) => (
        <h4 {...prepareProps(props)} className={cx()}>
          {props.children}
        </h4>
      ),
      normal: (props) => (
        <p
          {...prepareProps(props)}
          className={cx({
            'm-0': usage === 'default',
          })}
        >
          {props.children}
        </p>
      ),
      blockquote: ({ children }) => (
        <blockquote
          className={cx({ 'border-l-purple-500 pl-3': usage === 'default' })}
        >
          {children}
        </blockquote>
      ),
    },
    marks: {
      strong: (props) => <span className="font-bold">{props.children}</span>,
      em: (props) => <em>{props.children}</em>,
      underline: (props) => <u>{props.children}</u>,
      code: ({ children }) => <code className="code">{children}</code>,
    },
    list: {
      bullet: ({ children }) => <ul className="list-disc p-2">{children}</ul>,
      number: ({ children }) => (
        <ol className="list-decimal p-2">{children}</ol>
      ),
    },

    types: getBlockTypes(fieldName),
  }
}

export function RichText({
  value = [],
  fieldName = 'body',
  usage = 'textPage',
}: PortableTextProps<PortableTextBlock | ArbitraryTypedObject> & {
  fieldName?: string
  usage?: 'default' | 'textPage'
}) {
  const defaultComponents = createDefaultComponents(fieldName, usage)
  const components: PortableTextComponents = {
    types: {
      ...defaultComponents.types,
    },
  }

  return <PortableText value={value} components={components} />
}
