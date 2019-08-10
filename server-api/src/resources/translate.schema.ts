import { Document, model, Model, Schema } from 'mongoose';

export interface Translation {
    key: string,
    value: string,
    fromLanguage: string,
    toLanguage: string,
}

export interface TranslationDocument extends Document, Translation {
}

export interface TranslationModel extends Model<TranslationDocument> {
}

const TranslationSchema = new Schema({
    key: String,
    value: String,
    fromLanguage: String,
    toLanguage: String,
});

export const Translation = model<TranslationDocument, TranslationModel>('Translation', TranslationSchema);
