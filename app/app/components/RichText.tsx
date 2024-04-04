import {
  PortableText,
  PortableTextBlock,
  PortableTextComponents,
  PortableTextProps,
} from '@portabletext/react'
import { ArbitraryTypedObject } from '@portabletext/types'

export function RichText({
  value = [],
}: PortableTextProps<PortableTextBlock | ArbitraryTypedObject>) {
  const components: PortableTextComponents = {
    types: {
      image: ({ value }) => {
        return (
          <img
            style={{
              maxWidth: '100%',
            }}
            src={value.url}
          />
        )
      },
      codeSnippet: ({ value }) => {
        return (
          <code
            style={{
              margin: '2rem 0',
            }}
          >
            {value.code.code}
          </code>
        )
      },
    },
  }

  return <PortableText value={value} components={components} />
}
