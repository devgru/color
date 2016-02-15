import { expect } from 'chai';
import ClosestColor from '../app/domain/ClosestColor'
describe('ClosestColor', () => {
  it('knows white\'s name', () => {
    expect(ClosestColor('#FFFFFF').name).to.equal('White');
  });
});
