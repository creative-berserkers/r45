export enum TokenType {
  IDENTIFIER = 'identifier',
  OPERATOR = 'operator',
  LITERAL = 'literal',
  KEYWORD = 'keyword',
  SEPARATOR = 'separator',
}

export interface Token {
  type: TokenType,
  value: string | number | boolean
}

export const WHITE_SPACE_CHARACTERS = [' ']
export const SEPARATORS = ['{', '}']
export const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

export const isWhiteSpace = (character: string) => WHITE_SPACE_CHARACTERS.indexOf(character) !== -1
export const isSeparator = (character: string) => SEPARATORS.indexOf(character) !== -1
export const isDigit = (character: string) => DIGITS.indexOf(character) !== -1

export const scanWhiteSpace = (source: string, cursor: number): number =>
  isWhiteSpace(source.charAt(cursor)) ? scanWhiteSpace(source, cursor + 1) : cursor

export const scanNumber = (source: string, cursor: number): number =>
  isDigit(source.charAt(cursor)) ?

export const tokenize = (source: string): Token[] => {
  const letters = source.split('')
  const tokens = []
  let cursor = 0

  while (cursor < letters.length) {
    const currentLetter = letters[cursor]
    if (isWhiteSpace(currentLetter)) {
      cursor = scanWhiteSpace(source, cursor)
    }
    if (isDigit(currentLetter)) {
      const { endLine, value } = scanNumber(source, cursor)
      cursor = endLine
    }
    if (isSeparator(currentLetter)) {
      tokens.push({
        type: TokenType.SEPARATOR,
        value: currentLetter,
      })
      cursor = cursor + 1
    } else if (isNumber(currentLetter)) {

    }

  }
  return tokens
}
