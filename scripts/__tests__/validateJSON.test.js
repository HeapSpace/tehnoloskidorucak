const { validate, loadAndValidate } = require('../validateJSON')

describe('loadAndValidate', () => {
  it('raises an error if false jsonFileName is passed', () => {
    expect(() => loadAndValidate('Random'))
      .toThrow("Cannot find module '../data/Random' from 'validateJSON.js'")
  })

  describe("JSON files", () => {
    it("returns array if Meetups are valid", () => {
      expect(loadAndValidate('Meetups')).toBeInstanceOf(Array)
    })

    it("returns array if Presenters are valid", () => {
      expect(loadAndValidate('Presenters')).toBeInstanceOf(Array)
    })

    it("returns array if Locations are valid", () => {
      expect(loadAndValidate('Locations')).toBeInstanceOf(Array)
    })

    it("returns array if Regions are valid", () => {
      expect(loadAndValidate('Regions')).toBeInstanceOf(Array)
    })
  })
})

describe('validate', () => {
  it('raises an error if false jsonFileName is passed', () => {
    expect(() => validate([], 'Random')).toThrow('Invalid JSON filename')
  })

  it('raises an error if JSON is invalid', () => {
    const invalidPresenter = {
      Name: 'Steva.rs',
      TD: 'BGD-46',
      Speakers: 'Steva Perić',
    }
    expect(() => validate([invalidPresenter], 'Presenters'))
      .toThrow('Meetup is a required field in Presenters data')
  })

  it("returns array if it's valid", () => {
    const validPresenter = {
      Name: 'Steva.rs',
      TD: 'BGD-46',
      Speakers: 'Steva Perić',
      Meetup: ["recut2iBwFZb8csaV"]
    }

    expect(validate([validPresenter], 'Presenters')).toEqual([validPresenter])
  })
})
