export default async function Product({ params }: { params: { id: string } }) {
  const { id: productId } = await params;

  return (
    <div>
      <h1>Product {productId}</h1>
    </div>
  );
}
