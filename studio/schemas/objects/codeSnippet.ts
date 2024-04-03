import {CodeIcon} from '@sanity/icons'

import {defineField, defineType} from 'sanity'

import {capitalize} from '../../utils/strings'
import {commonSyntaxList} from '../../lib/components/codeLang'

export const codeSnippet = defineField({
  name: 'codeSnippet',
  title: 'Code Snippet',
  type: 'object',
  icon: CodeIcon,
  fields: [
    {
      name: 'code',
      title: 'Code',
      type: 'code',
      options: {
        language: 'typescript',
        languageAlternatives: commonSyntaxList,
      },
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      code: 'code',
    },
    prepare({code}) {
      return {
        title: `${code?.language ? capitalize(code.language) : 'Code'} snippet`,
      }
    },
  },
})
