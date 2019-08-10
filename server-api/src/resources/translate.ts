import { Request, Response } from 'express';
import { Translation } from './translate.schema';
import { GOOGLE_TRANSLATE_API } from '../config/env';
const fetch = require('node-fetch');

export async function saveTranslation(translate: Translation) {
    return Translation.create(translate);
}

export async function getTranslationFromDb(key: string) {
    return Translation.findOne({ key });
}

export const getTranslation = async (req: Request, res: Response) => {
    const { word } = req.query;

    if (!word) {
        res.json('give me a word');
        return;
    }

    const cachedTranslation = await getTranslationFromDb(word)
        .catch((err) => err);
    if (cachedTranslation) {
        res.json(cachedTranslation.value);
        return;
    }

    if (!GOOGLE_TRANSLATE_API) {
        res.status(500).json('Google api key not found');
        throw new Error('Google api key not found');
    }

    const url = new URL('https://translation.googleapis.com/language/translate/v2');
    const params = {
        key: GOOGLE_TRANSLATE_API,
        target: 'en',
        source: 'ar',
        q: word
    }
    type paramKeys = keyof typeof params;
    const paramKeys = Object.keys(params) as paramKeys[];
    paramKeys.forEach(_key => url.searchParams.append(_key, params[_key]))

    fetch(url, { method: 'GET' })
        .then((_res: any) => _res.json())
        .then(async (_res: any) => {
            const translatedText = _res.data.translations[0].translatedText
            res.json(translatedText);
            saveTranslation({
                key: word,
                value: translatedText,
                fromLanguage: 'ar',
                toLanguage: 'en',
            });
        })
        .catch((err: any) => {
            console.log(err);
            res.json({ err });
        });

}