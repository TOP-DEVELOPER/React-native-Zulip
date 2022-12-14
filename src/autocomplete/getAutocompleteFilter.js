/* @flow strict-local */
import type { InputSelection } from '../types';

export default (
  textWhole: string,
  selection: InputSelection,
): {| lastWordPrefix: string, filter: string |} => {
  const { start, end } = selection;
  let text = textWhole;
  if (start === end && start !== text.length) {
    // new letter is typed in middle
    text = text.substring(0, start);
  }

  const lastIndex: number = Math.max(
    text.lastIndexOf(':'),
    text.lastIndexOf('#'),
    ['\n', ' ', '#', ':'].includes(text[text.lastIndexOf('@') - 1]) || text.lastIndexOf('@') === 0 // to make sure `@` is not the part of email
      ? text.lastIndexOf('@')
      : -1,
  );

  const lastWordPrefix: string = lastIndex !== -1 ? text[lastIndex] : '';
  const filter: string =
    text.length > lastIndex + 1 && !['\n', ' '].includes(text[lastIndex + 1])
      ? text.substring(lastIndex + 1, text.length)
      : '';

  return { lastWordPrefix, filter };
};
