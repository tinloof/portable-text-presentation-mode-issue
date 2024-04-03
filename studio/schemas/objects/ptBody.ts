import {getCustomBody} from '../../helpers/getCustomBody'
import {codeSnippet} from './codeSnippet'

const ptBlocks = [codeSnippet]

export const ptBody = {
  name: 'ptBody',
  title: 'Rich Text with blocks',
  ...getCustomBody({
    styles: true,
    lists: true,
    blockTypes: ptBlocks.map((block) => block.name),
  }),
}
