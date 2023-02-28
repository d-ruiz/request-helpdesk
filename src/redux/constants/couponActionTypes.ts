export interface CouponState {
  isLoading: boolean
};

export enum couponConstants {
    COUPON_LOADING = 'COUPON_LOADING',
};

interface LoadingCoupon {
  type: typeof couponConstants.COUPON_LOADING
}

export type CouponActionTypes = LoadingCoupon;
