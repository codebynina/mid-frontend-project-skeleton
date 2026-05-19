import Layout from "@/components/Layout/Layout";
import OrderDetail from "@/components/OrderDetail/OrderDetail";

export default function OrderDetailPage({ params }) {
  return (
    <Layout>
      <OrderDetail id={params.id} />
    </Layout>
  );
}
