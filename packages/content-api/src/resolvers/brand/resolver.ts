import { availableBrands } from './brands';
import { localization } from '../locale/resolver';

function getBrand(parent, args, context, info) {
    return getBrandByBrandName('travel-web');
}

function getBrandByBrandName(name: string) {
    return availableBrands[0];
}

export const brandResolver = {
    Query: {
        getBrand
    },
    Brand: {
        localization
    }
};