import { ChannelSaleData } from "@saleor/channels/utils";
import { RequireOnlyOne } from "@saleor/misc";
export interface ChannelArgs {
  discountValue: string;
  minSpent: string;
}

export type ChannelInput = RequireOnlyOne<
  ChannelArgs,
  "discountValue" | "minSpent"
>;

export function createSaleChannelsChangeHandler(
  channelListings: ChannelSaleData[],
  updateChannels: (data: ChannelSaleData[]) => void,
  triggerChange: () => void
) {
  return (id: string, discountValue: string) => {
    const channelIndex = channelListings.findIndex(
      channel => channel.id === id
    );
    const channel = channelListings[channelIndex];

    const updatedChannels = [
      ...channelListings.slice(0, channelIndex),
      {
        ...channel,
        discountValue
      },
      ...channelListings.slice(channelIndex + 1)
    ];

    updateChannels(updatedChannels);
    triggerChange();
  };
}

export function formatChannelsChangeHandler(
  channelListings: ChannelSaleData[]
) {
  const newFormat = channelListings.map(value => ({
    channelId: value.id,
    price: Number(value.discountValue)
  }));
  return newFormat;
}
