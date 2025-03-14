import Link from "next/link";

interface LinkItem {
  tag: string;
  href: string;
}

const links: LinkItem[] = [
  {
    tag: "메인 페이지",
    href: `/`,
  },
  {
    tag: "지도 상세 페이지",
    href: `/map/e2bd57e6-4cc4-4851-a346-adc329085281`,
  },
  {
    tag: "지도 수정 페이지",
    href: `/edit/e2bd57e6-4cc4-4851-a346-adc329085281`,
  },
  {
    tag: "테스트 페이지",
    href: `/test`,
  },
];

export const DevNav = () => {
  return (
    <div className={"fixed bottom-10 right-10"}>
      {links.map((c) => (
        <div key={c.tag}>
          <Link href={c.href}>{c.tag}</Link>
        </div>
      ))}
    </div>
  );
};
