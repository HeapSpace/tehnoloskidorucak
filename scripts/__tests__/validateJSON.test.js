const validate = require('../validateJSON')
const chalk = require('chalk');

describe('validate', () => {
  it('raises an error if false jsonFileName is passed', () => {
    expect(() => validate([], 'Random')).toThrow('Invalid JSON filename')
  })

  it('raises an error if JSON is invalid', () => {
    const invalidPresenter = {
      _id: 123,
      Name: 'Steva.rs',
      TD: 'BGD-46',
      Speakers: 'Steva Perić',
    }
    expect(() => validate([invalidPresenter], 'Presenters'))
      .toThrow(`${chalk.bgRed('Meetup')} is a required field in ${chalk.bgCyan('Presenters')} data`)
  })

  it("returns array if it's valid", () => {
    const validPresenter = {
      _id: 123,
      Name: 'Steva.rs',
      TD: 'BGD-46',
      Speakers: 'Steva Perić',
      Meetup: ["recut2iBwFZb8csaV"]
    }

    expect(validate([validPresenter], 'Presenters')).toEqual([validPresenter])
  })

  describe("JSON files", () => {
    it("returns array if Meetups are valid", () => {
      const meetups = require('../../data/Meetups.json')
      expect(validate(meetups, 'Meetups')).toBeInstanceOf(Array)
    })

    it("returns array if Presenters are valid", () => {
      const presenters = require('../../data/Presenters.json')
      expect(validate(presenters, 'Presenters')).toBeInstanceOf(Array)
    })

    it("returns array if Locations are valid", () => {
      const locations = require('../../data/Locations.json')
      expect(validate(locations, 'Locations')).toBeInstanceOf(Array)
    })

    it("returns array if Regions are valid", () => {
      const regions = require('../../data/Regions.json')
      expect(validate(regions, 'Regions')).toBeInstanceOf(Array)
    })
  })
})
