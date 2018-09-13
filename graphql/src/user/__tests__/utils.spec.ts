import { getUserId } from '../../utils';

describe('This is a utils test', () => {
  process.env.APP_SECRET = 'jwtsecret123';

  test('Check the getUserId function', () => {
    expect(
      getUserId(
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1Yjk2NTA3NDdmNDUzMjNkMGVjYjZhZDAiLCJpYXQiOjE1MzY4Mzc4MzR9.RkyWNm82fSIAiqYtjwAFiy1QEkgVrA-EKLLTAs71vVc',
      ),
    ).toEqual('5b9650747f45323d0ecb6ad0');
  });
});
