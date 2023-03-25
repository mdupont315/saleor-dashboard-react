export const mapEdgesToTableItem = (data: any) => {
  if (!data || !data?.edges) {
    return [];
  }
  return data.edges.map(({ node }) => node);
};
