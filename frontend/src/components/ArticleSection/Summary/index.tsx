// @eslint-ignore
import { ThemeContent } from "../../../context/ThemeContent"
import { useContext } from 'react'

export default function ArticleSection({ text }: { text: string[] }) {

  const theme = useContext(ThemeContent);

  if (!text.length) {
    return <></>;
  }

  return (
    <div className={"article" + " " + theme.theme.toLowerCase()}>
      <section className="top-bar">
        <div>
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.75 5.25H14.25V6.75H0.75V5.25ZM0.75 8.25H11.25V9.75H0.75V8.25Z"
              fill={theme.theme == 'Dark' ? 'white' : 'black'}
            />
          </svg>

          <h2>Smart Summary</h2>
        </div>
        <button disabled={true}>
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.6204 6.05478V6.0549C10.6201 7.2659 10.139 8.42723 9.28273 9.28355C8.42649 10.1399 7.26525 10.6211 6.05432 10.6214H6.05399C3.53175 10.6203 1.30769 8.39507 1.30762 5.87355L10.6204 6.05478ZM10.6204 6.05478C10.6204 3.53121 8.39522 1.30685 5.87287 1.30685C5.27326 1.30685 4.67952 1.42498 4.12556 1.65449C3.57161 1.88401 3.06829 2.22041 2.64436 2.64448C2.22042 3.06856 1.88418 3.572 1.65482 4.12604C1.42547 4.68006 1.3075 5.27382 1.30762 5.87343L10.6204 6.05478ZM10.6485 8.84245L10.444 9.17815L10.7219 9.45612L14.3096 13.0442C14.4395 13.174 14.4878 13.2827 14.4978 13.3449C14.5021 13.372 14.4996 13.3901 14.4947 13.4047C14.4898 13.4195 14.4769 13.4478 14.4378 13.4869L13.543 14.3818C13.543 14.3818 13.543 14.3818 13.543 14.3818C13.4671 14.4575 13.3643 14.5 13.2572 14.5C13.1501 14.5 13.0473 14.4575 12.9714 14.3819C12.9714 14.3819 12.9714 14.3818 12.9713 14.3818L9.36519 10.7734L9.09206 10.5001L8.7587 10.6955C7.93864 11.1761 7.00515 11.4291 6.05465 11.4282H6.0542C3.08731 11.4282 0.5 8.84073 0.5 5.87343V5.87335C0.499886 5.16767 0.638782 4.46889 0.908754 3.81691C1.17872 3.16493 1.57448 2.57253 2.07342 2.07355C2.57235 1.57456 3.16469 1.17878 3.81659 0.908783C4.4685 0.638791 5.1672 0.499886 5.87279 0.5H5.87287C8.84082 0.5 11.428 3.08663 11.428 6.05478L11.428 6.05561C11.4296 7.03862 11.1599 8.00299 10.6485 8.84245Z"
              fill={theme.theme == 'Dark' ? 'white' : "#191B43"}
              stroke={theme.theme == 'Dark' ? 'white' : "#191B43"}
            />
          </svg>
        </button>
      </section>

      <article className="a">
        <p>{text}</p>
      </article>
    </div>
  );
}
