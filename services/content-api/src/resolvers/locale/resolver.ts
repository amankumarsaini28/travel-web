import { Locale } from './Locale';

type Resolver<T> = (...args) => T;

const supportedLocales: Resolver<Locale[]> = () => [{
    code: 'en',
    name: 'English'
}]

const locale: Resolver<String> = () => supportedLocales()[0].code;

export const localization: Resolver<unknown> = () => ({ locale, supportedLocales }) ;

export const localeResolver = {
    Query: {
        supportedLocales
    }
};
