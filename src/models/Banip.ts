import { model, Schema, Document, HookNextFunction, models } from 'mongoose';
import error from '@error';

export interface BanipInterface {
  ip: string;
  reason: string;
  due: number;
}

const BanipSchema: Schema = new Schema({
  ip: { type: String, required: true },
  reason: { type: String, required: true },
  due: { type: Number, required: true },
});

export interface BanipDocument extends Document, BanipInterface {
  // Add Methods here
}

// BanipSchema.methods.~~

BanipSchema.pre('save', function (next: HookNextFunction) {
  const doc = this as BanipDocument;
  models.Banip.findOne({ ip: doc.ip }, function (err, user) {
    if (user) next(error.db.exists() as any);
    if (err) next(err);
    next();
  });
});

const Banip = model<BanipDocument>('Banip', BanipSchema);

export default Banip;
