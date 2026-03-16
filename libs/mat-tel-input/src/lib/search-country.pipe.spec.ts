import { Country } from './country.model';
import { SearchCountryPipe } from './search-country.pipe';

describe('SearchCountryPipe', () => {
  const countries: Country[] = [
    {
      name: 'United States',
      iso2: 'us',
      dialCode: '1',
      priority: 0,
      areaCodes: ['201'],
      flagClass: 'US',
      placeHolder: '',
    },
    {
      name: 'Tanzania',
      iso2: 'tz',
      dialCode: '255',
      priority: 0,
      areaCodes: ['22'],
      flagClass: 'TZ',
      placeHolder: '',
    },
  ];

  it('should return all countries when there is no search criteria', () => {
    const pipe = new SearchCountryPipe();

    expect(pipe.transform(countries)).toEqual(countries);
    expect(pipe.transform(countries, '')).toEqual(countries);
  });

  it('should match countries by name, dial code, and area code', () => {
    const pipe = new SearchCountryPipe();

    expect(pipe.transform(countries, 'states')).toEqual([countries[0]]);
    expect(pipe.transform(countries, '255')).toEqual([countries[1]]);
    expect(pipe.transform(countries, '201')).toEqual([countries[0]]);
  });
});
