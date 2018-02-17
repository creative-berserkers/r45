import { isWhiteSpace, scanWhiteSpace, tokenize, TokenType } from './tokenizer'
import { expect } from 'chai'
import 'mocha'


describe('tokenizer', () => {
  it('tokenize basic example', () => {
    const result = tokenize('2 * 3')
    expect(result).to.equal([
      {
        type: TokenType.LITERAL,
        value: 2,
      },
      {
        type: TokenType.OPERATOR,
        value: '*',
      },
      {
        type: TokenType.LITERAL,
        value: 3,
      },
    ])
  })


  describe('isWhiteSpace', () => {
    it('should return true', () => {
      expect(isWhiteSpace(' ')).to.equal(true)
    })
    it('should return false', () => {
      expect(isWhiteSpace('x')).to.equal(false)
    })
  })

  describe('scanWhiteSpace', () => {
    it('should return true', () => {
      expect(scanWhiteSpace('', 0)).to.equal(0)
    })
    it('should return false', () => {
      expect(scanWhiteSpace('     x', 0)).to.equal(5)
    })
  })
})
