type Props = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function StructuredData({ data }: Props) {
  const list = Array.isArray(data) ? data : [data];

  return (
    <>
      {list.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
