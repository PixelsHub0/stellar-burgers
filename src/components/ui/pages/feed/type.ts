import { TOrder } from '@utils-types';

export interface FeedUIProps {
  orders: TOrder[];
  handleGetFeeds: () => void;
}
