import * as React from "react";
import Svg, {
  Path,
  G,
  Defs,
  ClipPath,
  Rect,
  Circle,
  Line,
  Polyline,
  Polygon,
  Ellipse,
} from "react-native-svg";

import { SvgProps } from "react-native-svg";

export type IconProps = SvgProps & {
  size?: number;
  color?: string;
};

export const Icons = {
  audience: (props: IconProps) => (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <G clipPath="url(#clip0_1234_52109)">
        <Path
          d="M8.00043 8.50001C8.98227 8.50001 9.77821 7.70408 9.77821 6.72224C9.77821 5.7404 8.98227 4.94446 8.00043 4.94446C7.01859 4.94446 6.22266 5.7404 6.22266 6.72224C6.22266 7.70408 7.01859 8.50001 8.00043 8.50001Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M5.15663 14.5231C4.72196 14.3915 4.42951 13.9586 4.5264 13.5142C4.87574 11.9169 6.29796 10.7213 8.00018 10.7213C9.7024 10.7213 11.1246 11.9169 11.474 13.5142C11.5708 13.9578 11.2793 14.3915 10.8437 14.5231C10.114 14.7435 9.14507 14.9444 8.00018 14.9444C6.85529 14.9444 5.8864 14.7444 5.15663 14.5231Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M12.222 4.72221C12.9584 4.72221 13.5553 4.12526 13.5553 3.38888C13.5553 2.6525 12.9584 2.05554 12.222 2.05554C11.4856 2.05554 10.8887 2.6525 10.8887 3.38888C10.8887 4.12526 11.4856 4.72221 12.222 4.72221Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M12.0742 6.94264C12.1231 6.94086 12.172 6.93909 12.2218 6.93909C13.7089 6.93909 14.9587 7.95864 15.3089 9.33642C15.4244 9.79064 15.1213 10.2431 14.6707 10.3738C14.0991 10.5391 13.3756 10.6866 12.5347 10.716"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M3.77767 4.72221C4.51405 4.72221 5.111 4.12526 5.111 3.38888C5.111 2.6525 4.51405 2.05554 3.77767 2.05554C3.04129 2.05554 2.44434 2.6525 2.44434 3.38888C2.44434 4.12526 3.04129 4.72221 3.77767 4.72221Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M3.92537 6.94264C3.87648 6.94086 3.82759 6.93909 3.77781 6.93909C2.2907 6.93909 1.04092 7.95864 0.690701 9.33642C0.575146 9.79064 0.878257 10.2431 1.32892 10.3738C1.90048 10.5391 2.62403 10.6866 3.46492 10.716"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1234_52109">
          <Rect
            width="16"
            height="16"
            fill="white"
            transform="translate(0 0.5)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  ),
  warning: (props: IconProps) => (
    <Svg width="16" height="17" viewBox="0 0 16 17" fill="none" {...props}>
      <Path
        d="M6.78935 3.66546L1.96712 12.0175C1.42935 12.949 2.10135 14.1144 3.17779 14.1144H12.8222C13.8987 14.1144 14.5707 12.9499 14.0329 12.0175L9.21068 3.66546C8.6729 2.73391 7.32712 2.73391 6.78935 3.66546Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 6.33594V9.44705"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.99997 12.6196C7.50931 12.6196 7.11108 12.2205 7.11108 11.7307C7.11108 11.2409 7.50931 10.8418 7.99997 10.8418C8.49064 10.8418 8.88886 11.2409 8.88886 11.7307C8.88886 12.2205 8.49064 12.6196 7.99997 12.6196Z"
        fill="currentColor"
      />
    </Svg>
  ),
  insights: (props: IconProps) => (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M18.75 17.084H1.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4.5835 7.08398V12.9173"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.4165 10.417V12.917"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10 2.91699V12.917"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  insightsActive: (props: IconProps) => (
    <Svg width="20" height="18" viewBox="0 0 20 18" fill="none" {...props}>
      <Path
        d="M15.9502 0.1875C17.8573 0.187599 19.4998 1.63584 19.5 3.53711V14.5879C19.4998 16.4892 17.8573 17.9374 15.9502 17.9375H4.0498C2.14272 17.9374 0.500225 16.4892 0.5 14.5879V3.53711C0.500225 1.63584 2.14272 0.187599 4.0498 0.1875H15.9502ZM10 2.16699C9.58579 2.16699 9.25 2.50278 9.25 2.91699V12.917C9.25023 13.331 9.58593 13.667 10 13.667C10.4141 13.667 10.7498 13.331 10.75 12.917V2.91699C10.75 2.50278 10.4142 2.16699 10 2.16699ZM15.417 9.66699C15.0028 9.66699 14.667 10.0028 14.667 10.417V12.917C14.6672 13.331 15.0029 13.667 15.417 13.667C15.8309 13.6668 16.1668 13.3309 16.167 12.917V10.417C16.167 10.0029 15.831 9.66722 15.417 9.66699ZM4.58301 6.33301C4.16913 6.33324 3.83324 6.66913 3.83301 7.08301V12.916C3.83301 13.3301 4.16899 13.6658 4.58301 13.666C4.99722 13.666 5.33301 13.3302 5.33301 12.916V7.08301C5.33278 6.66899 4.99708 6.33301 4.58301 6.33301Z"
        fill="currentColor"
      />
    </Svg>
  ),
  unreadArrow: (props: IconProps) => (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M2.44446 8.22287L6.00001 12.6673L13.5556 3.33398"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  readArrow: (props: IconProps) => (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <G clipPath="url(#clip0_13229_403)">
        <Path
          d="M0.666748 8.44437L4.00008 12.6666L11.1112 3.55548"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M7.56079 11.8293L8.22212 12.6666L15.3332 3.55548"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_13229_403">
          <Rect width="16" height="16" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  ),
  dollarSign: (props: IconProps) => (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <G clipPath="url(#clip0_1811_3003)">
        <Path
          fillRule="evenodd"
          stroke="currentColor"
          clipRule="evenodd"
          d="M8 2.5C4.96243 2.5 2.5 4.96243 2.5 8C2.5 11.0376 4.96243 13.5 8 13.5C11.0376 13.5 13.5 11.0376 13.5 8C13.5 4.96243 11.0376 2.5 8 2.5ZM1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8ZM8.5 4.5C8.5 4.22386 8.27614 4 8 4C7.72386 4 7.5 4.22386 7.5 4.5V5H7.25C6.78587 5 6.34075 5.18437 6.01256 5.51256C5.68437 5.84075 5.5 6.28587 5.5 6.75C5.5 7.21413 5.68437 7.65925 6.01256 7.98744C6.34075 8.31563 6.78587 8.5 7.25 8.5H8.75C8.94891 8.5 9.13968 8.57902 9.28033 8.71967C9.42098 8.86032 9.5 9.05109 9.5 9.25C9.5 9.44891 9.42098 9.63968 9.28033 9.78033C9.13968 9.92098 8.94891 10 8.75 10H8H6.5C6.22386 10 6 10.2239 6 10.5C6 10.7761 6.22386 11 6.5 11H7.5V11.5C7.5 11.7761 7.72386 12 8 12C8.27614 12 8.5 11.7761 8.5 11.5V11H8.75C9.21413 11 9.65925 10.8156 9.98744 10.4874C10.3156 10.1592 10.5 9.71413 10.5 9.25C10.5 8.78587 10.3156 8.34075 9.98744 8.01256C9.65925 7.68437 9.21413 7.5 8.75 7.5H7.25C7.05109 7.5 6.86032 7.42098 6.71967 7.28033C6.57902 7.13968 6.5 6.94891 6.5 6.75C6.5 6.55109 6.57902 6.36032 6.71967 6.21967C6.86032 6.07902 7.05109 6 7.25 6H8H9.5C9.77614 6 10 5.77614 10 5.5C10 5.22386 9.77614 5 9.5 5H8.5V4.5Z"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1811_3003">
          <Rect width="16" height="16" />
        </ClipPath>
      </Defs>
    </Svg>
  ),
  arrowLeft: (props: IconProps) => (
    <Svg width="16" height="16" fill="none" viewBox="0 0 16 16" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M2.444 8h11.111M6.222 4.222C5.074 7.333 2.444 8 2.444 8s2.63.667 3.778 3.778"
      />
    </Svg>
  ),
  arrowRight: (props: IconProps) => (
    <Svg width="16" height="16" fill="none" viewBox="0 0 16 16" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M13.555 8H2.445M9.778 11.778C10.926 8.667 13.556 8 13.556 8s-2.63-.667-3.778-3.778"
      />
    </Svg>
  ),
  arrowDown: (props: IconProps) => (
    <Svg width="16" height="16" fill="none" viewBox="0 0 16 16" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M8 13.555V2.445M4.222 9.778C7.333 10.926 8 13.556 8 13.556s.667-2.63 3.778-3.778"
      />
    </Svg>
  ),
  arrowUp: (props: IconProps) => (
    <Svg width="16" height="16" fill="none" viewBox="0 0 16 16" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M8 2.444v11.111M11.778 6.222C8.667 5.074 8 2.444 8 2.444s-.667 2.63-3.778 3.778"
      />
    </Svg>
  ),
  arrowTopLeft: (props: IconProps) => (
    <Svg width="16" height="16" fill="none" viewBox="0 0 16 16" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m3.333 3.334 9.334 9.333M8.675 3.334c-3.011 1.388-5.342 0-5.342 0s1.389 2.33 0 5.342"
      />
    </Svg>
  ),
  arrowTopRight: (props: IconProps) => (
    <Svg width="16" height="16" fill="none" viewBox="0 0 16 16" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m12.667 3.334-9.334 9.333M12.667 8.676c-1.389-3.012 0-5.342 0-5.342s-2.331 1.388-5.343 0"
      />
    </Svg>
  ),
  arrowBottomLeft: (props: IconProps) => (
    <Svg width="16" height="16" fill="none" viewBox="0 0 16 16" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m3.333 12.667 9.334-9.333M3.333 7.324c1.389 3.012 0 5.342 0 5.342s2.33-1.388 5.342 0"
      />
    </Svg>
  ),
  arrowBottomRight: (props: IconProps) => (
    <Svg width="16" height="16" fill="none" viewBox="0 0 16 16" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12.667 12.667 3.333 3.334M7.324 12.666c3.012-1.388 5.343 0 5.343 0s-1.389-2.33 0-5.342"
      />
    </Svg>
  ),
  check: (props: IconProps) => (
    <Svg width="16" height="16" fill="none" viewBox="0 0 16 16" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M2.444 8.222 6 12.667l7.555-9.333"
      />
    </Svg>
  ),
  close: (props: IconProps) => (
    <Svg width="16" height="16" fill="none" viewBox="0 0 16 16" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m12.445 3.556-8.89 8.889M3.556 3.556l8.889 8.889"
      />
    </Svg>
  ),
  closeThick: (props: IconProps) => (
    <Svg width={28} height={28} viewBox="0 0 28 28" fill="none" {...props}>
      <Path
        d="M21.7782 6.22266L6.22266 21.7782"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.22266 6.22266L21.7782 21.7782"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  play: (props: IconProps) => (
    <Svg width="16" height="16" fill="none" viewBox="0 0 16 16" {...props}>
      <Path
        fill="currentColor"
        d="M12.63 7.249 5.588 2.783a.89.89 0 0 0-1.366.751v8.933a.89.89 0 0 0 1.366.75l7.042-4.466a.89.89 0 0 0 0-1.501z"
      />
    </Svg>
  ),
  heartOutline: (props: IconProps) => (
    <Svg width="16" height="16" fill="none" viewBox="0 0 16 16" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m13.511 8.197-4.87 5.062a.89.89 0 0 1-1.282 0L2.49 8.197a3.392 3.392 0 1 1 5.51-3.817 3.4 3.4 0 0 1 5.34-1.033c.475.417.826.98.986 1.592.323 1.229-.03 2.433-.814 3.258"
      />
    </Svg>
  ),
  heartFill: (props: IconProps) => (
    <Svg width="16" height="16" fill="none" viewBox="0 0 16 16" {...props}>
      <Path
        fill="currentColor"
        d="m13.511 8.197-4.87 5.062a.89.89 0 0 1-1.282 0L2.49 8.197a3.392 3.392 0 1 1 5.51-3.817 3.4 3.4 0 0 1 5.34-1.033c.475.417.826.98.986 1.592.323 1.229-.03 2.433-.814 3.258"
      ></Path>
    </Svg>
  ),
  comment: (props: IconProps) => (
    <Svg width="16" height="16" fill="none" viewBox="0 0 16 16" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12.667 2H3.333c-.982 0-1.777.796-1.777 1.778V10c0 .981.795 1.778 1.777 1.778h1.778v2.666l3.334-2.666h4.222c.982 0 1.778-.797 1.778-1.778V3.778c0-.982-.796-1.778-1.778-1.778"
      ></Path>
    </Svg>
  ),
  link: (props: IconProps) => (
    <Svg width="16" height="16" fill="none" viewBox="0 0 16 16" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12.667 9.555v2.223c0 .982-.796 1.777-1.778 1.777H4.222a1.777 1.777 0 0 1-1.778-1.777V5.11c0-.982.796-1.778 1.778-1.778h3.111M11.556 1.556l2.889 2.889-2.89 2.888"
      ></Path>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M14.222 4.444h-2.889A3.556 3.556 0 0 0 7.778 8"
      ></Path>
    </Svg>
  ),
  link01: (props: IconProps) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M11.3342 9.10254C10.8649 9.32654 10.4249 9.63321 10.0369 10.0225L10.0236 10.0359C8.18224 11.8772 8.18224 14.8612 10.0236 16.7025L12.9236 19.6025C14.7649 21.4439 17.7489 21.4439 19.5902 19.6025L19.6036 19.5892C21.4449 17.7479 21.4449 14.7639 19.6036 12.9225L18.3622 11.6812"
        stroke="#121212"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.666 14.8976C13.1353 14.6736 13.5753 14.3669 13.9633 13.9776L13.9766 13.9643C15.818 12.1229 15.818 9.13894 13.9766 7.2976L11.0766 4.3976C9.23529 2.55627 6.25129 2.55627 4.40996 4.3976L4.39663 4.41093C2.55529 6.25227 2.55529 9.23627 4.39663 11.0776L5.63796 12.3189"
        stroke="#121212"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  messageOutline: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <G
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        clipPath="url(#clip0_4045_611)"
      >
        <Path d="M8 1.556A6.445 6.445 0 0 0 1.556 8c0 1.173.318 2.269.865 3.215.382.717-.048 2.41-.865 3.23 1.11.06 2.575-.442 3.229-.865A6.392 6.392 0 0 0 8 14.445a6.445 6.445 0 0 0 0-12.89M5.111 6.444h5.778M5.111 9.556h4"></Path>
      </G>
      <Defs>
        <ClipPath id="clip0_4045_611">
          <Path fill="#fff" d="M0 0h16v16H0z"></Path>
        </ClipPath>
      </Defs>
    </Svg>
  ),
  message: (props: IconProps) => (
    <Svg width="17" height="16" viewBox="0 0 17 16" fill="none" {...props}>
      <Path
        d="M8.49999 1.55566C4.94088 1.55566 2.05554 4.441 2.05554 8.00011C2.05554 9.17255 2.37376 10.2686 2.92043 11.2152C3.30265 11.9317 2.87332 13.6259 2.05554 14.4446C3.16665 14.505 4.63065 14.0028 5.28488 13.5797C5.71954 13.8303 6.40843 14.1628 7.31065 14.3334C7.69554 14.4063 8.09376 14.4446 8.49999 14.4446C12.0591 14.4446 14.9444 11.5592 14.9444 8.00011C14.9444 4.441 12.0591 1.55566 8.49999 1.55566Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.61111 6.44434H11.3889"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.61111 9.55566H9.61111"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  video: (props: IconProps) => (
    <Svg width={28} height={28} viewBox="0 0 28 28" fill="none" {...props}>
      <Path
        d="M18.2734 12.0531L24.1799 9.42733C24.6948 9.19866 25.2734 9.5751 25.2734 10.1382V17.8553C25.2734 18.4184 24.6948 18.7949 24.1799 18.5662L18.2734 15.9404"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.171 7.39062H5.83767C4.11945 7.39062 2.72656 8.78352 2.72656 10.5017V17.5017C2.72656 19.22 4.11945 20.6128 5.83767 20.6128H15.171C16.8892 20.6128 18.2821 19.22 18.2821 17.5017V10.5017C18.2821 8.78352 16.8892 7.39062 15.171 7.39062Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  videoCall: (props: IconProps) => (
    <Svg width="33" height="33" fill="none" viewBox="0 0 33 33" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m21.262 14.23 6.75-3.001a.89.89 0 0 1 1.25.813v8.819a.89.89 0 0 1-1.25.813l-6.75-3.001"
      ></Path>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M17.718 8.894H7.052a3.556 3.556 0 0 0-3.556 3.555v8a3.556 3.556 0 0 0 3.556 3.556h10.666a3.556 3.556 0 0 0 3.556-3.556v-8a3.556 3.556 0 0 0-3.556-3.555"
      ></Path>
    </Svg>
  ),
  videoCallRegular: (props: IconProps) => (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M10.4443 6.88888L13.8194 5.38844C14.1137 5.25777 14.4443 5.47288 14.4443 5.79466V10.2044C14.4443 10.5262 14.1137 10.7413 13.8194 10.6107L10.4443 9.11022"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.66678 4.22217H3.33344C2.3516 4.22217 1.55566 5.01811 1.55566 5.99995V9.99995C1.55566 10.9818 2.3516 11.7777 3.33344 11.7777H8.66678C9.64862 11.7777 10.4446 10.9818 10.4446 9.99995V5.99995C10.4446 5.01811 9.64862 4.22217 8.66678 4.22217Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  mixedMedia: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m5.855 10.883 4.628-4.623a.89.89 0 0 1 1.257 0l2.705 2.705"
      ></Path>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M1.556 6v5.778c0 .982.795 1.778 1.777 1.778h7.556"
      ></Path>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6 10.889h6.667c.981 0 1.777-.796 1.777-1.778V4.222c0-.982-.796-1.778-1.777-1.778H6c-.982 0-1.778.796-1.778 1.778v4.89c0 .981.796 1.777 1.778 1.777"
      ></Path>
      <Path
        fill="currentColor"
        d="M7.111 6.222a.89.89 0 0 1-.889-.889.89.89 0 0 1 1.778 0c0 .49-.4.89-.889.89"
      ></Path>
    </Svg>
  ),
  image: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m3.556 13.111 5.187-5.188a1.777 1.777 0 0 1 2.514 0l3.188 3.188"
      ></Path>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M3.333 13.111h9.334c.981 0 1.777-.796 1.777-1.778V4.667c0-.982-.796-1.778-1.777-1.778H3.333c-.982 0-1.778.796-1.778 1.778v6.666c0 .982.796 1.778 1.778 1.778"
      ></Path>
      <Path
        fill="currentColor"
        d="M5.111 7.555a1.111 1.111 0 1 0 0-2.222 1.111 1.111 0 0 0 0 2.222"
      ></Path>
    </Svg>
  ),
  addImage: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.413"
        d="m3.344 13.324 5.399-5.4a1.777 1.777 0 0 1 2.514 0l2.298 2.298"
      ></Path>
      <Path
        fill="currentColor"
        d="M5.555 7.555a1.111 1.111 0 1 0 0-2.222 1.111 1.111 0 0 0 0 2.222"
      ></Path>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.413"
        d="M12.666 1.111v4.445M8.41 2.445H4.222c-.982 0-1.777.796-1.777 1.777v7.556c0 .982.795 1.778 1.777 1.778h7.556c.982 0 1.778-.796 1.778-1.778V7.59M14.889 3.333h-4.445"
      ></Path>
    </Svg>
  ),
  signOut: (props: IconProps) => (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <G clipPath="url(#clip0_6646_31254)">
        <Path
          id="Vector"
          d="M13.0555 6.38889V3.61111C13.0555 2.99778 12.5578 2.5 11.9444 2.5H4.72221C4.10887 2.5 3.6111 2.99778 3.6111 3.61111V16.3889C3.6111 17.0022 4.10887 17.5 4.72221 17.5H11.9444C12.5578 17.5 13.0555 17.0022 13.0555 16.3889V13.6111"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          id="Vector_2"
          d="M16.1111 6.94434L19.1667 9.99989L16.1111 13.0554"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          id="Vector_3"
          d="M19.1667 10H12.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          id="Vector_4"
          d="M3.8411 2.94214L7.5311 5.22992C7.85776 5.43214 8.05665 5.78992 8.05665 6.17436V13.8266C8.05665 14.211 7.85776 14.5677 7.5311 14.771L3.83998 17.0599"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_6646_31254">
          <Rect width="20" height="20" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  ),
  signOutActive: (props: IconProps) => (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M13.0555 6.38889V3.61111C13.0555 2.99778 12.5578 2.5 11.9444 2.5H4.7222C4.10886 2.5 3.61108 2.99778 3.61108 3.61111V16.3889C3.61108 17.0022 4.10886 17.5 4.7222 17.5H11.9444C12.5578 17.5 13.0555 17.0022 13.0555 16.3889V13.6111"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.1111 6.94434L19.1666 9.99989L16.1111 13.0554"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19.1667 10H12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.8412 2.94238L7.5312 5.23016C7.85787 5.43238 8.05675 5.79016 8.05675 6.17461V13.8268C8.05675 14.2113 7.85787 14.5679 7.5312 14.7713L3.84009 17.0602"
        fill="currentColor"
      />
      <Path
        d="M3.8412 2.94238L7.5312 5.23016C7.85787 5.43238 8.05675 5.79016 8.05675 6.17461V13.8268C8.05675 14.2113 7.85787 14.5679 7.5312 14.7713L3.84009 17.0602"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  unlocked: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <G
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        clipPath="url(#clip0_4078_1148)"
      >
        <Path d="M6.445 7.333V4.445a2.889 2.889 0 1 0-5.778 0v1.11M8.444 10.444v.89"></Path>
        <Path d="M11.778 7.333H5.11c-.982 0-1.778.796-1.778 1.778v3.556c0 .981.796 1.777 1.778 1.777h6.667c.981 0 1.777-.796 1.777-1.777V9.11c0-.982-.796-1.778-1.777-1.778"></Path>
      </G>
      <Defs>
        <ClipPath id="clip0_4078_1148">
          <Path fill="#fff" d="M0 0h16v16H0z"></Path>
        </ClipPath>
      </Defs>
    </Svg>
  ),
  lockOpen: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M5.111 7.333V4.445a2.889 2.889 0 1 1 5.778 0M8 10.444v.89"
      ></Path>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M11.333 7.333H4.667c-.982 0-1.778.796-1.778 1.778v3.556c0 .981.796 1.777 1.778 1.777h6.666c.982 0 1.778-.796 1.778-1.777V9.11c0-.982-.796-1.778-1.778-1.778"
      ></Path>
    </Svg>
  ),
  locked: (props: IconProps) => (
    <Svg fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M5.111 7.333V4.445a2.889 2.889 0 1 1 5.778 0v2.888M8 10.444v.89"
      ></Path>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M11.333 7.333H4.667c-.982 0-1.778.796-1.778 1.778v3.556c0 .981.796 1.777 1.778 1.777h6.666c.982 0 1.778-.796 1.778-1.777V9.11c0-.982-.796-1.778-1.778-1.778"
      ></Path>
    </Svg>
  ),
  lock: (props: IconProps) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M4 15C4 13.0609 4.01234 12.3285 4.19577 11.7639C4.59145 10.5462 5.54618 9.59145 6.76393 9.19577C7.32849 9.01234 8.06089 9 10 9H14C15.9391 9 16.6715 9.01234 17.2361 9.19577C18.4538 9.59145 19.4086 10.5462 19.8042 11.7639C19.9877 12.3285 20 13.0609 20 15C20 16.9391 19.9877 17.6715 19.8042 18.2361C19.4086 19.4538 18.4538 20.4086 17.2361 20.8042C16.6715 20.9877 15.9391 21 14 21H10C8.06089 21 7.32849 20.9877 6.76393 20.8042C5.54618 20.4086 4.59145 19.4538 4.19577 18.2361C4.01234 17.6715 4 16.9391 4 15Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <Path
        d="M8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V9H8V7Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.47534 13.4729C10.1091 12.8424 11.1367 12.8424 11.7705 13.4729L12 13.7012L12.2295 13.4729C12.8633 12.8424 13.8909 12.8424 14.5247 13.4729C15.1584 14.1033 15.1584 15.1255 14.5247 15.756L12.459 17.8109C12.2055 18.063 11.7945 18.063 11.541 17.8109L9.47534 15.756C8.84155 15.1255 8.84155 14.1033 9.47534 13.4729Z"
      />
    </Svg>
  ),
  lockedPrice: (props: IconProps) => (
    <Svg width="17" height="17" viewBox="0 0 17 17" {...props}>
      <Path
        d="M8.5 0.649902C10.5095 0.650166 12.1386 2.27907 12.1387 4.28857V7.17725C12.1387 7.27004 12.1187 7.35791 12.0879 7.43994C13.3641 7.5677 14.361 8.64487 14.3613 9.95459V13.5103C14.3613 14.9063 13.2291 16.0386 11.833 16.0386H5.16602C3.77016 16.0383 2.63867 14.9062 2.63867 13.5103V9.95459C2.63902 8.64535 3.63468 7.56835 4.91016 7.43994C4.87942 7.358 4.86133 7.26992 4.86133 7.17725V4.28857C4.86145 2.27898 6.4904 0.65002 8.5 0.649902ZM5.16602 8.92725C4.59882 8.92748 4.13904 9.38742 4.13867 9.95459V13.5103C4.13867 14.0777 4.59859 14.5383 5.16602 14.5386H11.833C12.4006 14.5386 12.8613 14.0779 12.8613 13.5103V9.95459C12.861 9.38728 12.4004 8.92725 11.833 8.92725H5.16602ZM8.65234 10.5591C9.07478 10.1389 9.76007 10.139 10.1826 10.5591C10.6051 10.9794 10.6051 11.6612 10.1826 12.0815L8.80566 13.4517C8.63664 13.6196 8.3623 13.6197 8.19336 13.4517L6.81641 12.0815C6.39397 11.6612 6.39391 10.9794 6.81641 10.5591C7.23887 10.1389 7.92415 10.139 8.34668 10.5591L8.5 10.7114L8.65234 10.5591ZM8.5 2.1499C7.31883 2.15002 6.36145 3.1074 6.36133 4.28857V7.17725C6.36133 7.26534 6.34236 7.34872 6.31445 7.42725H10.6846C10.6566 7.34872 10.6387 7.26534 10.6387 7.17725V4.28857C10.6386 3.10749 9.68105 2.15017 8.5 2.1499Z"
        fill="#FCFCFC"
      />
    </Svg>
  ),
  beat: (props: IconProps) => (
    <Svg width="33" height="32" fill="none" viewBox="0 0 33 32" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M2.39 14.667v2.667M29.056 14.667v2.667M7.723 6.667v18.667M13.056 10.223v11.555M18.39 4.89V27.11M23.723 10.223v11.555"
      ></Path>
    </Svg>
  ),
  lockedHeart: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        fill="currentColor"
        fillRule="evenodd"
        d="M8 1.65a2.14 2.14 0 0 0-2.139 2.139v2.889a.8.8 0 0 1-.043.25h4.364a.8.8 0 0 1-.043-.25v-2.89A2.14 2.14 0 0 0 8 1.65M4.361 6.678q.001.138.047.263a2.53 2.53 0 0 0-2.27 2.514v3.556a2.53 2.53 0 0 0 2.529 2.528h6.666a2.53 2.53 0 0 0 2.528-2.528V9.455a2.53 2.53 0 0 0-2.27-2.514.8.8 0 0 0 .048-.263v-2.89a3.639 3.639 0 1 0-7.278 0zm.306 1.75c-.568 0-1.028.46-1.028 1.027v3.556c0 .568.46 1.028 1.028 1.028h6.666c.568 0 1.028-.46 1.028-1.028V9.455c0-.567-.46-1.028-1.028-1.028zm3.18 1.631a1.086 1.086 0 0 0-1.53 0 1.07 1.07 0 0 0 0 1.523l1.377 1.37a.434.434 0 0 0 .612 0l1.377-1.37a1.07 1.07 0 0 0 0-1.523 1.086 1.086 0 0 0-1.53 0L8 10.212z"
        clipRule="evenodd"
      ></Path>
    </Svg>
  ),
  shieldCheck: (props: IconProps) => (
    <Svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <Path d="m9 12 2 2 4-4" />
    </Svg>
  ),
  chevronDown: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M13.555 6.667 8 10.445 2.444 6.666"
      ></Path>
    </Svg>
  ),
  chevronLeft: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M9.333 13.555 5.556 8l3.777-5.556"
      ></Path>
    </Svg>
  ),
  chevronDoubleLeft: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M8.25 13.25 4 9l4.25-4.25M13 13.25 8.75 9 13 4.75"
      ></Path>
    </Svg>
  ),
  chevronDoubleRight: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M9.75 4.75 14 9l-4.25 4.25M5 4.75 9.25 9 5 13.25"
      ></Path>
    </Svg>
  ),
  chevronRight: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6.667 2.444 10.445 8l-3.778 5.555"
      ></Path>
    </Svg>
  ),
  chevronTop: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M2.444 9.333 8 5.556l5.555 3.777"
      ></Path>
    </Svg>
  ),
  hamburger: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M2 8h12M2 3.333h12M2 12.667h12"
      ></Path>
    </Svg>
  ),
  send: (props: IconProps) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M4.06035 4.78213C3.71555 3.61266 4.94198 2.59649 6.02715 3.16006L6.02617 3.16104L20.1287 10.4823L20.1297 10.4833C21.1239 11.0009 21.124 12.4237 20.1297 12.9413C20.1271 12.9426 20.1235 12.9429 20.1209 12.9442L6.02617 20.2626L6.02715 20.2636C4.9444 20.8262 3.71119 19.8133 4.06035 18.6396L5.89043 12.4638H12.2986L12.3748 12.4599C12.753 12.4215 13.0486 12.1021 13.0486 11.7138C13.0486 11.3254 12.753 11.006 12.3748 10.9677L12.2986 10.9638H5.89141L4.06035 4.78213Z"
        fill="currentColor"
      />
    </Svg>
  ),
  sendOutline: (props: IconProps) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12.5136 12H6.65625"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20.6301 12.6107L5.3408 20.5494C4.80213 20.8294 4.19013 20.3254 4.36346 19.7427L6.65813 12L4.36346 4.25736C4.19146 3.67469 4.80213 3.17069 5.3408 3.45069L20.6288 11.3894C21.1235 11.6467 21.1235 12.3547 20.6288 12.612L20.6301 12.6107Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  stop: (props: IconProps) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Rect x="7" y="7" width="10" height="10" rx="2" fill="currentColor" />
    </Svg>
  ),
  gif: (props: IconProps) => (
    <Svg width="19" height="18" viewBox="0 0 19 18" fill="none" {...props}>
      <G clipPath="url(#clip0_9695_7385)">
        <Path
          d="M10.25 4.75V13.25"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M13.25 13.25V4.75H17.741"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M13.25 8.75H17.25"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M5 9.25H7.75C7.651 11.481 6.515 13.25 4.5 13.25C2.515 13.25 1.25 11.347 1.25 9C1.25 6.653 2.515 4.75 4.5 4.75C5.786 4.75 6.77 5.549 7.303 6.75"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_9695_7385">
          <Rect
            width="18"
            height="18"
            fill="white"
            transform="translate(0.5)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  ),
  calendar: (props: IconProps) => (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M6.38885 4.09722V1.875"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.6111 4.09722V1.875"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.2778 4.09668H4.72222C3.49492 4.09668 2.5 5.0916 2.5 6.3189V15.7633C2.5 16.9906 3.49492 17.9856 4.72222 17.9856H15.2778C16.5051 17.9856 17.5 16.9906 17.5 15.7633V6.3189C17.5 5.0916 16.5051 4.09668 15.2778 4.09668Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.5 7.98633H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  duplicate: (props: IconProps) => (
    <Svg width="16" height="17" viewBox="0 0 16 17" fill="none" {...props}>
      <Path
        d="M3.33301 11.8335L9.55523 11.8335C10.5371 11.8335 11.333 11.0376 11.333 10.0557L11.333 3.8335C11.333 2.85166 10.5371 2.05572 9.55523 2.05572L3.33301 2.05572C2.35117 2.05572 1.55523 2.85166 1.55523 3.8335L1.55523 10.0557C1.55523 11.0376 2.35117 11.8335 3.33301 11.8335Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.5105 5.83496L14.4251 11.9896C14.5691 12.9612 13.8989 13.8652 12.9283 14.0092L6.77359 14.9238C5.94426 15.0474 5.1647 14.5772 4.86426 13.8323"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  calendarScheduler: (props: IconProps) => (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <G clipPath="url(#clip0_14245_7323)">
        <Path
          d="M12.2222 2.44434H3.77778C2.79594 2.44434 2 3.24027 2 4.22211V11.7777C2 12.7595 2.79594 13.5554 3.77778 13.5554H12.2222C13.2041 13.5554 14 12.7595 14 11.7777V4.22211C14 3.24027 13.2041 2.44434 12.2222 2.44434Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M5.11108 2.44428V0.666504"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M10.8889 2.44428V0.666504"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M2 5.55566H14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M8 11.3334V7.77783"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M6.22217 9.55566H9.77772"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_14245_7323">
          <Rect width="16" height="16" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  ),
  calendarActive: (props: IconProps) => (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <Path
        d="M6.38885 4.09722V1.875"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.6111 4.09722V1.875"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.25 15.7637C18.2498 17.405 16.9187 18.7354 15.2773 18.7354H4.72266C3.08125 18.7354 1.75018 17.405 1.75 15.7637V8.73633H18.25V15.7637ZM15.4307 3.35059C17.001 3.43015 18.2498 4.72924 18.25 6.31934V7.23633H1.75V6.31934C1.75016 4.67796 3.08124 3.34668 4.72266 3.34668H15.2773L15.4307 3.35059Z"
        fill="currentColor"
      />
    </Svg>
  ),
  calendarDays: (props: IconProps) => (
    <Svg width="16" height="16" fill="none" viewBox="0 0 16 16" {...props}>
      <G clipPath="url(#clip0_5488_140)">
        <Path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M5.111 2.445V.667M10.889 2.445V.667M12.222 2.444H3.778C2.796 2.444 2 3.24 2 4.222v7.556c0 .981.796 1.777 1.778 1.777h8.444c.982 0 1.778-.796 1.778-1.777V4.222c0-.982-.796-1.778-1.778-1.778M2 5.556h12"
        ></Path>
        <Path
          fill="currentColor"
          d="M8 7.333a.89.89 0 0 0-.889.89c0 .489.4.888.889.888.49 0 .889-.4.889-.889A.89.89 0 0 0 8 7.333M11.111 9.111c.49 0 .889-.4.889-.889a.89.89 0 0 0-.889-.889.89.89 0 0 0-.889.89c0 .489.4.888.89.888M8 10a.89.89 0 0 0-.889.889c0 .49.4.889.889.889A.89.89 0 0 0 8 10M4.889 10a.89.89 0 0 0-.889.889c0 .49.4.889.889.889a.89.89 0 0 0 0-1.778M11.111 10a.89.89 0 0 0-.889.889.89.89 0 0 0 1.778 0A.89.89 0 0 0 11.11 10"
        ></Path>
      </G>
      <Defs>
        <ClipPath id="clip0_5488_140">
          <Path fill="currentColor" d="M0 0h16v16H0z"></Path>
        </ClipPath>
      </Defs>
    </Svg>
  ),
  inbox: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M1.556 5.111 7.57 8.43a.89.89 0 0 0 .858 0l6.016-3.318"
      ></Path>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M3.333 13.111h9.334c.981 0 1.777-.796 1.777-1.778V4.667c0-.982-.796-1.778-1.777-1.778H3.333c-.982 0-1.778.796-1.778 1.778v6.666c0 .982.796 1.778 1.778 1.778"
      ></Path>
    </Svg>
  ),
  home: (props: IconProps) => (
    <Svg width="19" height="22" viewBox="0 0 19 22" fill="none" {...props}>
      <Path
        d="M1.69366 7.26668L8.69366 1.94668C9.17099 1.58402 9.83099 1.58402 10.307 1.94668L17.307 7.26668C17.639 7.51868 17.8337 7.91202 17.8337 8.32802V18C17.8337 19.4734 16.6403 20.6667 15.167 20.6667H3.83366C2.36033 20.6667 1.16699 19.4734 1.16699 18V8.32802C1.16699 7.91068 1.36166 7.51868 1.69366 7.26668Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.5 20.3335V16.0001"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  homeActive: (props: IconProps) => (
    <Svg width="17" height="21" viewBox="0 0 17 21" fill="none" {...props}>
      <Path
        d="M0.693659 6.26665L7.69366 0.946652C8.17099 0.583985 8.83099 0.583985 9.30699 0.946652L16.307 6.26665C16.639 6.51865 16.8337 6.91199 16.8337 7.32799V17C16.8337 18.4733 15.6403 19.6667 14.167 19.6667H2.83366C1.36033 19.6667 0.166992 18.4733 0.166992 17V7.32799C0.166992 6.91065 0.361659 6.51865 0.693659 6.26665Z"
        fill="currentColor"
      />
      <Path
        d="M8.5 19.3334V15.0001"
        stroke="#FCFCFC"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  payment: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M1.556 6.444h12.889M3.333 12.667h9.334c.981 0 1.777-.796 1.777-1.778V5.111c0-.982-.796-1.778-1.777-1.778H3.333c-.982 0-1.778.796-1.778 1.778v5.778c0 .982.796 1.778 1.778 1.778M3.778 10h2.666M11.333 10h.89"
      ></Path>
    </Svg>
  ),
  settings: (props: IconProps) => (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M10.0001 11.9433C11.074 11.9433 11.9446 11.0728 11.9446 9.99889C11.9446 8.925 11.074 8.05444 10.0001 8.05444C8.92622 8.05444 8.05566 8.925 8.05566 9.99889C8.05566 11.0728 8.92622 11.9433 10.0001 11.9433Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <Path
        d="M16.861 8.0867L15.8288 7.72226C15.7154 7.43226 15.5854 7.14448 15.4254 6.8667C15.2654 6.58893 15.081 6.33337 14.8866 6.09004L15.0866 5.01448C15.2254 4.26893 14.8788 3.51559 14.2221 3.1367L13.8321 2.91115C13.1743 2.53115 12.3499 2.60782 11.7732 3.10115L10.9454 3.80893C10.3232 3.71337 9.68656 3.71337 9.05322 3.80893L8.22545 3.10004C7.64878 2.6067 6.82323 2.53004 6.16656 2.91004L5.77656 3.13559C5.11878 3.51448 4.77322 4.26782 4.91211 5.01337L5.11211 6.08559C4.71211 6.58448 4.39434 7.1367 4.16545 7.72337L3.13878 8.08559C2.42322 8.33782 1.94434 9.01448 1.94434 9.77337V10.2234C1.94434 10.9823 2.42322 11.6589 3.13878 11.9111L4.171 12.2756C4.28434 12.5656 4.41323 12.8523 4.57434 13.13C4.73545 13.4078 4.91878 13.6634 5.11323 13.9078L4.91211 14.9834C4.77322 15.7289 5.11989 16.4823 5.77656 16.8611L6.16656 17.0867C6.82434 17.4667 7.64878 17.39 8.22545 16.8967L9.05322 16.1878C9.67434 16.2834 10.311 16.2834 10.9432 16.1878L11.7721 16.8978C12.3488 17.3911 13.1743 17.4678 13.831 17.0878L14.221 16.8623C14.8788 16.4823 15.2243 15.73 15.0854 14.9845L14.8854 13.9111C15.2843 13.4123 15.6032 12.8611 15.831 12.2745L16.8588 11.9123C17.5743 11.66 18.0532 10.9834 18.0532 10.2245V9.77448C18.0532 9.01559 17.5743 8.33893 16.8588 8.0867H16.861Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </Svg>
  ),
  settingsActive: (props: IconProps) => (
    <Svg width="18" height="16" viewBox="0 0 18 16" fill="none" {...props}>
      <Path
        d="M5.16699 0.910219C5.82362 0.530239 6.64892 0.606409 7.22559 1.09967L8.05371 1.80866C8.68684 1.71315 9.32328 1.71317 9.94531 1.80866L10.7734 1.10065C11.3501 0.6074 12.1743 0.531275 12.832 0.911195L13.2227 1.13678C13.8789 1.51567 14.2256 2.26847 14.0869 3.01373L13.8867 4.08991C14.0811 4.3332 14.2658 4.58854 14.4258 4.86627C14.5858 5.144 14.7158 5.4318 14.8291 5.72174L15.8613 6.086H15.8594C16.5748 6.33827 17.0537 7.01565 17.0537 7.77448V8.2237C17.0537 8.9825 16.5748 9.65988 15.8594 9.91217L14.8311 10.2745C14.6033 10.861 14.2846 11.4124 13.8857 11.9112L14.0859 12.9844C14.2247 13.7298 13.8793 14.4824 13.2217 14.8624L12.8311 15.088C12.1745 15.4677 11.349 15.3907 10.7725 14.8975L9.94336 14.1876C9.31126 14.2831 8.67471 14.2831 8.05371 14.1876L7.22559 14.8965C6.64893 15.3898 5.82472 15.466 5.16699 15.086L4.77637 14.8604C4.12016 14.4815 3.77347 13.7287 3.91211 12.9835L4.11328 11.9073C3.9189 11.6629 3.73528 11.4076 3.57422 11.1299C3.41311 10.8522 3.28423 10.5654 3.1709 10.2755L2.13867 9.9112C1.42323 9.65892 0.944336 8.98154 0.944336 8.22272V7.7735C0.944336 7.01469 1.42324 6.33731 2.13867 6.08502L3.16602 5.72272C3.39489 5.13621 3.7124 4.5838 4.1123 4.08502L3.91211 3.01276C3.7734 2.26736 4.11877 1.51368 4.77637 1.13483L5.16699 0.910219ZM9 5.30377C7.51211 5.30383 6.30592 6.51026 6.30566 7.99811C6.30566 9.48617 7.51195 10.6924 9 10.6924C10.488 10.6923 11.6943 9.48613 11.6943 7.99811C11.6941 6.51031 10.4878 5.30391 9 5.30377ZM9 6.80377C9.6594 6.80391 10.1941 7.33874 10.1943 7.99811C10.1943 8.6577 9.65956 9.19231 9 9.19245C8.34038 9.19239 7.80566 8.65775 7.80566 7.99811C7.80592 7.33869 8.34053 6.80383 9 6.80377Z"
        fill="currentColor"
      />
    </Svg>
  ),
  profile: (props: IconProps) => (
    <Svg width="25" height="24" viewBox="0 0 25 24" fill="none" {...props}>
      <Path
        d="M12.4997 9.66665C14.5247 9.66665 16.1663 8.02502 16.1663 5.99998C16.1663 3.97494 14.5247 2.33331 12.4997 2.33331C10.4746 2.33331 8.83301 3.97494 8.83301 5.99998C8.83301 8.02502 10.4746 9.66665 12.4997 9.66665Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.8498 20.688C19.9965 20.3267 20.5991 19.06 20.1125 17.9613C18.8191 15.04 15.9005 13 12.5005 13C9.10047 13 6.1818 15.04 4.88847 17.9613C4.4018 19.0613 5.00447 20.3267 6.15114 20.688C7.78447 21.2027 9.9458 21.6667 12.5005 21.6667C15.0551 21.6667 17.2165 21.2027 18.8498 20.688Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  profileRegular: (props: IconProps) => (
    <Svg width={16} height={17} viewBox="0 0 16 17" fill="none" {...props}>
      <Path
        d="M7.99999 6.94443C9.35002 6.94443 10.4444 5.85002 10.4444 4.49999C10.4444 3.14996 9.35002 2.05554 7.99999 2.05554C6.64996 2.05554 5.55554 3.14996 5.55554 4.49999C5.55554 5.85002 6.64996 6.94443 7.99999 6.94443Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.2328 14.292C12.9973 14.0511 13.3991 13.2066 13.0746 12.4742C12.2124 10.5266 10.2666 9.16663 7.99995 9.16663C5.73328 9.16663 3.7875 10.5266 2.92528 12.4742C2.60084 13.2075 3.00261 14.0511 3.76706 14.292C4.85595 14.6351 6.29684 14.9444 7.99995 14.9444C9.70306 14.9444 11.1439 14.6351 12.2328 14.292Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  profileActive: (props: IconProps) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M11.9997 9.66665C14.0247 9.66665 15.6663 8.02502 15.6663 5.99998C15.6663 3.97494 14.0247 2.33331 11.9997 2.33331C9.97463 2.33331 8.33301 3.97494 8.33301 5.99998C8.33301 8.02502 9.97463 9.66665 11.9997 9.66665Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.3498 20.688C19.4965 20.3267 20.0991 19.06 19.6125 17.9613C18.3191 15.04 15.4005 13 12.0005 13C8.60047 13 5.6818 15.04 4.38847 17.9613C3.9018 19.0613 4.50447 20.3267 5.65114 20.688C7.28447 21.2027 9.4458 21.6667 12.0005 21.6667C14.5551 21.6667 16.7165 21.2027 18.3498 20.688Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  unblock: (props: IconProps) => (
    <Svg width={16} height={17} viewBox="0 0 16 17" fill="none" {...props}>
      <Path
        d="M3.44263 13.0574L12.5493 3.95068"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.99999 14.9444C11.5592 14.9444 14.4444 12.0592 14.4444 8.49999C14.4444 4.94082 11.5592 2.05554 7.99999 2.05554C4.44082 2.05554 1.55554 4.94082 1.55554 8.49999C1.55554 12.0592 4.44082 14.9444 7.99999 14.9444Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  profileBlocked: (props: IconProps) => (
    <Svg width="16" height="17" viewBox="0 0 16 17" fill="none" {...props}>
      <G clipPath="url(#clip0_8218_105219)">
        <Path
          d="M7.99913 6.72873C9.34916 6.72873 10.4436 5.63432 10.4436 4.28429C10.4436 2.93426 9.34916 1.83984 7.99913 1.83984C6.6491 1.83984 5.55469 2.93426 5.55469 4.28429C5.55469 5.63432 6.6491 6.72873 7.99913 6.72873Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M8.92387 9.03335C8.62342 8.98268 8.31587 8.95068 8.00031 8.95068C5.73276 8.95068 3.78787 10.3107 2.92565 12.2574C2.6012 12.9907 3.00298 13.8342 3.76742 14.0751C4.79765 14.4005 6.15231 14.6858 7.73631 14.716"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M12.4436 15.6176C14.0391 15.6176 15.3325 14.3242 15.3325 12.7287C15.3325 11.1332 14.0391 9.83984 12.4436 9.83984C10.8481 9.83984 9.55469 11.1332 9.55469 12.7287C9.55469 14.3242 10.8481 15.6176 12.4436 15.6176Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M10.4023 14.7714L14.4823 10.6914"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_8218_105219">
          <Rect
            width="16"
            height="16"
            fill="white"
            transform="translate(0 0.28418)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  ),
  logout: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <G
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        clipPath="url(#clip0_4099_609)"
      >
        <Path d="M10.445 5.111V2.89A.89.89 0 0 0 9.555 2H3.779a.89.89 0 0 0-.89.889V13.11c0 .49.4.889.89.889h5.778a.89.89 0 0 0 .889-.889V10.89M12.889 5.556 15.333 8l-2.444 2.445M15.333 8H10"></Path>
        <Path d="m3.073 2.354 2.952 1.83c.261.162.42.448.42.756v6.121a.89.89 0 0 1-.42.756l-2.953 1.831"></Path>
      </G>
      <Defs>
        <ClipPath id="clip0_4099_609">
          <Path fill="#fff" d="M0 0h16v16H0z"></Path>
        </ClipPath>
      </Defs>
    </Svg>
  ),
  search: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M13.556 13.556 10.03 10.03M6.889 11.333a4.444 4.444 0 1 0 0-8.889 4.444 4.444 0 0 0 0 8.89"
      ></Path>
    </Svg>
  ),
  archive: (props: IconProps) => (
    <Svg width="16" height="17" viewBox="0 0 16 17" fill="none" {...props}>
      <Path
        d="M13.1111 6.05554V12.2778C13.1111 13.26 12.3156 14.0555 11.3334 14.0555H4.66669C3.68447 14.0555 2.88892 13.26 2.88892 12.2778V6.05554"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.5555 2.94446H2.44443C1.95351 2.94446 1.55554 3.34243 1.55554 3.83335V5.16668C1.55554 5.6576 1.95351 6.05557 2.44443 6.05557H13.5555C14.0465 6.05557 14.4444 5.6576 14.4444 5.16668V3.83335C14.4444 3.34243 14.0465 2.94446 13.5555 2.94446Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.22266 8.72223H9.77821"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  fashion: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M11.69 6.222a42 42 0 0 0 .088 8.222H4.222a41.7 41.7 0 0 0 .088-8.222"
      ></Path>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m13.556 7.778 1.555-.667-1.427-3.39a1.78 1.78 0 0 0-1.23-1.04l-2.011-.474.002.025a2.444 2.444 0 1 1-4.889 0q.002-.013.003-.025l-2.011.474c-.553.13-1.011.517-1.23 1.04L.89 7.112l1.555.667"
      ></Path>
    </Svg>
  ),
  beauty: (props: IconProps) => (
    <Svg width="16" height="16" fill="none" viewBox="0 0 16 16" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6.444 6.889V2.925c0-.16.086-.307.224-.386l2.223-1.27a.445.445 0 0 1 .664.385V6.89"
      ></Path>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M5.111 9.556V7.778A.89.89 0 0 1 6 6.888h4a.89.89 0 0 1 .889.89v1.778"
      ></Path>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M5.111 9.556h5.778a.89.89 0 0 1 .889.889v2.222c0 .981-.797 1.778-1.778 1.778H6a1.78 1.78 0 0 1-1.778-1.778v-2.222a.89.89 0 0 1 .89-.89"
      ></Path>
    </Svg>
  ),
  fitness: (props: IconProps) => (
    <Svg width="16" height="16" fill="none" viewBox="0 0 16 16" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M13.556 8h1.555M4.667 8h6.666M.889 8h1.555M4.667 4a1.111 1.111 0 1 0-2.223 0v8a1.111 1.111 0 1 0 2.223 0zM13.556 4a1.111 1.111 0 0 0-2.223 0v8a1.111 1.111 0 1 0 2.223 0z"
      ></Path>
    </Svg>
  ),
  comedy: (props: IconProps) => (
    <Svg
      width="18"
      height="18"
      fill="currentColor"
      viewBox="0 0 18 18"
      {...props}
    >
      <G clipPath="url(#clip0_4198_470)">
        <Path
          fill="currentColor"
          d="M10.575 9.562a.6.6 0 0 0-.518-.168 13.4 13.4 0 0 1-4.123-.001.59.59 0 0 0-.508.164.62.62 0 0 0-.172.532A2.795 2.795 0 0 0 8 12.445a2.795 2.795 0 0 0 2.746-2.359.61.61 0 0 0-.171-.523z"
        ></Path>
        <Path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M13.06 11.991A6.43 6.43 0 0 1 8 14.445c-2.052 0-3.88-.96-5.06-2.454M14.222 6.317a6.447 6.447 0 0 0-12.444 0"
        ></Path>
        <Path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M4.444 7.333a1.112 1.112 0 0 1 2.223 0M9.333 7.333a1.112 1.112 0 0 1 2.223 0"
        ></Path>
        <Path
          fill="currentColor"
          d="M.425 10.593a1.347 1.347 0 0 0 1.903-.069c.462-.495.539-1.44.537-2.022a.49.49 0 0 0-.523-.488c-.581.039-1.518.18-1.98.676a1.347 1.347 0 0 0 .063 1.904zM15.575 10.593a1.347 1.347 0 0 1-1.903-.069c-.462-.495-.539-1.44-.537-2.022a.49.49 0 0 1 .523-.488c.581.039 1.518.18 1.98.676.509.545.48 1.397-.063 1.904z"
        ></Path>
      </G>
      <Defs>
        <ClipPath id="clip0_4198_470">
          <Path fill="currentColor" d="M0 0h16v16H0z"></Path>
        </ClipPath>
      </Defs>
    </Svg>
  ),
  gaming: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        fill="currentColor"
        d="M9.556 7.111a.667.667 0 1 0 0-1.333.667.667 0 0 0 0 1.333M12.222 7.111a.667.667 0 1 0 0-1.333.667.667 0 0 0 0 1.333M10.889 6a.667.667 0 1 0 0-1.333.667.667 0 0 0 0 1.333M10.889 8.222a.667.667 0 1 0 0-1.333.667.667 0 0 0 0 1.333"
      ></Path>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M5.111 5.333v2.222M6.222 6.444H4M5.538 10.444h4.923"
      ></Path>
      <Path
        fill="currentColor"
        d="M5.111 11.556a1.333 1.333 0 1 0 0-2.667 1.333 1.333 0 0 0 0 2.667M10.889 11.556a1.333 1.333 0 1 0 0-2.667 1.333 1.333 0 0 0 0 2.667"
      ></Path>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12.598 11.942c.238.46.728.766 1.29.72.714-.058 1.229-.715 1.223-1.43-.007-1.053-.15-2.335-.407-3.788-.596-3.366-1.883-5-3.593-5-.787 0-1.486.347-1.974.89H6.863a2.65 2.65 0 0 0-1.974-.89c-1.71 0-2.996 1.634-3.593 5-.257 1.453-.4 2.734-.407 3.788-.005.715.51 1.372 1.222 1.43a1.33 1.33 0 0 0 1.29-.72"
      ></Path>
    </Svg>
  ),
  food: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <G clipPath="url(#clip0_4198_490)">
        <Path
          fill="currentColor"
          d="M12 3.111c.245 0 .444.2.444.445a2.223 2.223 0 0 1-2.222 2.222.445.445 0 0 1-.444-.445c0-1.226.995-2.222 2.222-2.222"
        ></Path>
        <Path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M2.444 5.111h5.778l-.202 8.466a.89.89 0 0 1-.888.867H3.534a.89.89 0 0 1-.889-.867z"
        ></Path>
        <Path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M1.556 1.556h1.87c.454 0 .835.34.884.79l1.023 9.21M10.667 7.34a3.556 3.556 0 1 1-.26 7.072"
        ></Path>
      </G>
      <Defs>
        <ClipPath id="clip0_4198_490">
          <Path fill="#fff" d="M0 0h16v16H0z"></Path>
        </ClipPath>
      </Defs>
    </Svg>
  ),
  travel: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <G
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        clipPath="url(#clip0_4201_245)"
      >
        <Path d="M11.143 4.857 9.538 8.603c-.18.42-.514.753-.934.933L4.86 11.141l1.605-3.745c.18-.42.514-.754.933-.934zM8 3.333V1.556M12.667 8h1.777M8 12.667v1.777M3.333 8H1.556"></Path>
        <Path d="M8 14.445a6.444 6.444 0 1 0 0-12.89 6.444 6.444 0 0 0 0 12.89"></Path>
      </G>
      <Defs>
        <ClipPath id="clip0_4201_245">
          <Path fill="#fff" d="M0 0h16v16H0z"></Path>
        </ClipPath>
      </Defs>
    </Svg>
  ),
  edit: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m9.875 3.93 2.694 2.695M2.944 13.555s3.2-.505 4.041-1.346l6.513-6.513a1.904 1.904 0 1 0-2.693-2.694L4.292 9.515c-.842.842-1.347 4.041-1.347 4.041z"
      ></Path>
    </Svg>
  ),

  save: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M9.556 2v2.667a.89.89 0 0 1-.89.889h-3.11a.89.89 0 0 1-.89-.89V2M4.667 14V9.556a.89.89 0 0 1 .889-.89h4.889a.89.89 0 0 1 .888.89V14"
      ></Path>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12.08 14H3.92A1.92 1.92 0 0 1 2 12.08V3.92C2 2.86 2.86 2 3.92 2h6.6c.236 0 .463.093.63.26l2.59 2.59c.167.168.26.394.26.63v6.6c0 1.06-.86 1.92-1.92 1.92"
      ></Path>
    </Svg>
  ),
  plus: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M9 3.25v11.5M3.25 9h11.5"
      ></Path>
    </Svg>
  ),
  info: (props: IconProps) => (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M10 18.0554C14.449 18.0554 18.0556 14.4489 18.0556 9.99989C18.0556 5.55093 14.449 1.94434 10 1.94434C5.55105 1.94434 1.94446 5.55093 1.94446 9.99989C1.94446 14.4489 5.55105 18.0554 10 18.0554Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10 14.2437V9.16699"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10 7.49957C9.38669 7.49957 8.88892 7.00068 8.88892 6.38845C8.88892 5.77623 9.38669 5.27734 10 5.27734C10.6134 5.27734 11.1111 5.77623 11.1111 6.38845C11.1111 7.00068 10.6134 7.49957 10 7.49957Z"
        fill="currentColor"
      />
    </Svg>
  ),
  infoActive: (props: IconProps) => (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M10 1.19434C14.863 1.19439 18.8055 5.13697 18.8057 10C18.8056 14.8631 14.8631 18.8056 10 18.8057C5.13697 18.8055 1.19439 14.863 1.19434 10C1.19447 5.13702 5.13702 1.19447 10 1.19434ZM10 8.41699C9.58579 8.41699 9.25 8.75278 9.25 9.16699V14.2441C9.25049 14.6579 9.58609 14.9941 10 14.9941C10.4139 14.9941 10.7495 14.6579 10.75 14.2441V9.16699C10.75 8.75278 10.4142 8.41699 10 8.41699ZM10 5.27734C9.38672 5.27734 8.88875 5.77652 8.88867 6.38867C8.88867 7.00089 9.38667 7.5 10 7.5C10.6133 7.49998 11.1113 7.00088 11.1113 6.38867C11.1112 5.77653 10.6133 5.27736 10 5.27734Z"
        fill="currentColor"
      />
    </Svg>
  ),
  star: (props: IconProps) => (
    <Svg width={16} height={17} viewBox="0 0 16 17" fill="none" {...props}>
      <Path
        d="M4.21606 2.71445L3.37517 2.43445L3.09428 1.59267C3.00362 1.32067 2.55295 1.32067 2.46228 1.59267L2.18139 2.43445L1.3405 2.71445C1.2045 2.75978 1.11206 2.88689 1.11206 3.03089C1.11206 3.17489 1.2045 3.30201 1.3405 3.34734L2.18139 3.62734L2.46228 4.46912C2.50762 4.60512 2.63473 4.69667 2.77784 4.69667C2.92095 4.69667 3.04895 4.60423 3.09339 4.46912L3.37428 3.62734L4.21517 3.34734C4.35117 3.30201 4.44362 3.17489 4.44362 3.03089C4.44362 2.88689 4.35206 2.75978 4.21606 2.71445Z"
        fill="currentColor"
      />
      <Path
        d="M11.9724 9.14624L14.4444 6.73647L9.9911 6.09024L7.99999 2.05469L6.00888 6.09024L1.55554 6.73647L4.77776 9.8778L4.01688 14.3125L7.8791 12.2822"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.4737 12.4915L12.3511 12.1173L11.9768 10.9947C11.8551 10.632 11.2551 10.632 11.1333 10.9947L10.7591 12.1173L9.6364 12.4915C9.45506 12.552 9.3324 12.7218 9.3324 12.9129C9.3324 13.104 9.45506 13.2738 9.6364 13.3342L10.7591 13.7084L11.1333 14.8311C11.1937 15.0124 11.3644 15.1351 11.5555 15.1351C11.7466 15.1351 11.9164 15.0124 11.9777 14.8311L12.352 13.7084L13.4746 13.3342C13.656 13.2738 13.7786 13.104 13.7786 12.9129C13.7786 12.7218 13.656 12.552 13.4746 12.4915H13.4737Z"
        fill="currentColor"
      />
      <Path
        d="M12.6667 4.05599C13.0349 4.05599 13.3333 3.75751 13.3333 3.38932C13.3333 3.02113 13.0349 2.72266 12.6667 2.72266C12.2985 2.72266 12 3.02113 12 3.38932C12 3.75751 12.2985 4.05599 12.6667 4.05599Z"
        fill="currentColor"
      />
    </Svg>
  ),
  starUnmark: (props: IconProps) => (
    <Svg width={16} height={17} viewBox="0 0 16 17" fill="none" {...props}>
      <Path
        d="M4.39643 12.1035L4.77776 9.87865L1.55554 6.73732L6.00888 6.09021L7.99999 2.05554L9.9911 6.09021L10.3564 6.14354"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.1004 6.54272L14.4444 6.73739L11.2222 9.87872L11.9831 14.3134L7.99997 12.2201L6.78308 12.8601"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.77777 14.7223L14.2222 2.27783"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  pinOutline: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m2.739 13.261 2.958-2.958M9.219 13.825a6.649 6.649 0 0 0 1.414-3.928l2.67-2.671a1.777 1.777 0 0 0 0-2.514l-2.015-2.016a1.777 1.777 0 0 0-2.514 0l-2.67 2.671a6.7 6.7 0 0 0-1.513.216 6.75 6.75 0 0 0-2.416 1.198z"
      ></Path>
    </Svg>
  ),
  pin: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m2.739 13.261 2.958-2.958"
      ></Path>
      <Path
        fill="currentColor"
        d="M9.219 13.825a6.649 6.649 0 0 0 1.414-3.928l2.67-2.671a1.777 1.777 0 0 0 0-2.514l-2.015-2.016a1.777 1.777 0 0 0-2.514 0l-2.67 2.671a6.7 6.7 0 0 0-1.513.216 6.75 6.75 0 0 0-2.416 1.198z"
      ></Path>
    </Svg>
  ),
  eyeClosed: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M1.859 7.27a9.97 9.97 0 0 0 7.141 3 9.97 9.97 0 0 0 7.141-3M4.021 8.942 2.75 11.019M7.3 10.126 6.823 12.5M13.979 8.942l1.271 2.077M10.7 10.126l.477 2.374"
      />
    </Svg>
  ),
  eyeOpened: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M1.859 8a9.97 9.97 0 0 1 7.14-3 9.97 9.97 0 0 1 7.142 3"
      />
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M9 13.25a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5M4.021 6.328 2.75 4.25M7.3 5.144l-.477-2.375M13.979 6.328 15.25 4.25M10.7 5.144l.477-2.375"
      />
    </Svg>
  ),
  instagram: (props: IconProps) => (
    <Svg
      fill="currentColor"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      {...props}
    >
      <Path d="M12.001 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6m0-2a5 5 0 1 1 0 10 5 5 0 0 1 0-10m6.5-.25a1.25 1.25 0 0 1-2.5 0 1.25 1.25 0 0 1 2.5 0M12.001 4c-2.474 0-2.878.007-4.029.058-.784.037-1.31.142-1.798.332-.434.168-.747.369-1.08.703a2.9 2.9 0 0 0-.704 1.08c-.19.49-.295 1.015-.331 1.798C4.007 9.075 4 9.461 4 12c0 2.475.007 2.878.058 4.029.037.783.142 1.31.331 1.797.17.435.37.748.702 1.08.337.336.65.537 1.08.703.494.191 1.02.297 1.8.333 1.104.052 1.49.058 4.029.058 2.475 0 2.878-.007 4.029-.058.782-.037 1.308-.142 1.797-.331.433-.169.748-.37 1.08-.703.337-.336.538-.649.704-1.08.19-.492.296-1.018.332-1.8.052-1.103.058-1.49.058-4.028 0-2.474-.007-2.878-.058-4.029-.037-.782-.143-1.31-.332-1.798a2.9 2.9 0 0 0-.703-1.08 2.9 2.9 0 0 0-1.08-.704c-.49-.19-1.016-.295-1.798-.331C14.926 4.006 14.54 4 12 4m0-2c2.717 0 3.056.01 4.123.06 1.064.05 1.79.217 2.427.465.66.254 1.216.598 1.772 1.153a4.9 4.9 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122s-.01 3.056-.06 4.122-.218 1.79-.465 2.428a4.9 4.9 0 0 1-1.153 1.772 4.9 4.9 0 0 1-1.772 1.153c-.637.247-1.363.415-2.427.465-1.067.047-1.406.06-4.123.06s-3.056-.01-4.123-.06c-1.064-.05-1.789-.218-2.427-.465a4.9 4.9 0 0 1-1.772-1.153 4.9 4.9 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428-.048-1.066-.06-1.405-.06-4.122s.01-3.056.06-4.122.217-1.79.465-2.428a4.9 4.9 0 0 1 1.153-1.772 4.9 4.9 0 0 1 1.772-1.153c.637-.248 1.362-.415 2.427-.465C8.945 2.013 9.284 2 12.001 2" />
    </Svg>
  ),
  snapchat: (props: IconProps) => (
    <Svg
      width="24"
      height="22"
      viewBox="0 0 24 22"
      fill="currentColor"
      {...props}
    >
      <Path
        d="M23.7437 17.8957C23.011 18.5706 21.9617 18.6393 21.0359 18.7C20.4456 18.7387 19.8352 18.7787 19.4784 18.9714C19.1341 19.1574 18.7792 19.635 18.4359 20.0967C17.8836 20.8397 17.2576 21.6818 16.2664 21.9307C15.3106 22.1709 14.368 21.7396 13.5362 21.3591C12.9905 21.1095 12.4261 20.8514 12.0008 20.8514C11.5755 20.8514 11.0112 21.1095 10.4655 21.3591C9.80036 21.6632 9.06418 21.9999 8.30735 21.9999C8.11447 22.0005 7.92228 21.9772 7.73533 21.9307C6.74406 21.6818 6.11807 20.8397 5.5657 20.0966C5.22242 19.635 4.86747 19.1574 4.52326 18.9714C4.16646 18.7787 3.55603 18.7387 2.96575 18.7C2.03998 18.6393 0.990706 18.5706 0.257971 17.8957C0.160637 17.8061 0.0871613 17.6944 0.0439673 17.5705C0.000773197 17.4465 -0.010824 17.3141 0.0101897 17.1847C0.0312035 17.0554 0.0841883 16.933 0.164512 16.8284C0.244835 16.7238 0.350052 16.6401 0.470962 16.5846C0.498696 16.5715 1.744 15.9746 2.96825 14.447C3.74889 13.4628 4.34872 12.3527 4.74079 11.1663L2.70778 10.3684C2.50664 10.2893 2.34573 10.1351 2.26041 9.93965C2.1751 9.7442 2.17237 9.5235 2.25283 9.32608C2.33329 9.12866 2.49035 8.97067 2.68948 8.88686C2.88861 8.80305 3.1135 8.80027 3.31472 8.87913L5.15883 9.60299C5.36611 8.55291 5.46797 7.48542 5.46295 6.41583C5.46295 4.71424 6.15176 3.08235 7.37784 1.87915C8.60393 0.675951 10.2669 0 12.0008 0C13.7348 0 15.3977 0.675951 16.6238 1.87915C17.8499 3.08235 18.5387 4.71424 18.5387 6.41583C18.5337 7.48542 18.6355 8.55291 18.8428 9.60299L20.6869 8.87914C20.8879 8.80101 21.1123 8.80427 21.3109 8.8882C21.5096 8.97214 21.6662 9.1299 21.7465 9.32693C21.8268 9.52396 21.8243 9.7442 21.7394 9.9394C21.6546 10.1346 21.4944 10.2889 21.2939 10.3684L19.2609 11.1664C19.6529 12.3527 20.2528 13.4629 21.0334 14.447C22.2654 15.9842 23.5186 16.5789 23.5311 16.5848C23.6516 16.6407 23.7563 16.7246 23.8362 16.8293C23.9162 16.9339 23.9689 17.0561 23.9898 17.1852C24.0108 17.3143 23.9993 17.4466 23.9564 17.5704C23.9135 17.6942 23.8405 17.8059 23.7437 17.8957H23.7437Z"
        fill="currentColor"
      />
    </Svg>
  ),
  tiktok: (props: IconProps) => (
    <Svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      {...props}
    >
      <Path
        d="M12.8822 3.70813C12.781 3.6558 12.6824 3.59843 12.5869 3.53625C12.3092 3.35264 12.0545 3.1363 11.8285 2.89188C11.2628 2.24469 11.0516 1.58812 10.9738 1.12844H10.9769C10.9119 0.746875 10.9388 0.5 10.9428 0.5H8.3666V10.4619C8.3666 10.5956 8.3666 10.7278 8.36097 10.8584C8.36097 10.8747 8.35941 10.8897 8.35847 10.9072C8.35847 10.9144 8.35847 10.9219 8.35691 10.9294C8.35691 10.9312 8.35691 10.9331 8.35691 10.935C8.32975 11.2924 8.21518 11.6377 8.02326 11.9405C7.83134 12.2432 7.56796 12.4942 7.25629 12.6713C6.93146 12.856 6.56406 12.953 6.19035 12.9525C4.99004 12.9525 4.01722 11.9738 4.01722 10.765C4.01722 9.55625 4.99004 8.5775 6.19035 8.5775C6.41756 8.57729 6.64338 8.61304 6.85941 8.68344L6.86253 6.06031C6.20671 5.9756 5.54045 6.02772 4.90578 6.21339C4.2711 6.39906 3.6818 6.71424 3.17503 7.13906C2.73099 7.52488 2.35768 7.98522 2.07191 8.49938C1.96316 8.68688 1.55285 9.44031 1.50316 10.6631C1.47191 11.3572 1.68035 12.0763 1.77972 12.3734V12.3797C1.84222 12.5547 2.08441 13.1519 2.4791 13.6553C2.79736 14.0591 3.17337 14.4139 3.59503 14.7081V14.7019L3.60128 14.7081C4.84847 15.5556 6.23129 15.5 6.23129 15.5C6.47066 15.4903 7.27254 15.5 8.18316 15.0684C9.19316 14.59 9.76816 13.8772 9.76816 13.8772C10.1355 13.4513 10.4276 12.9659 10.6319 12.4419C10.865 11.8291 10.9428 11.0941 10.9428 10.8003V5.51531C10.9741 5.53406 11.3903 5.80937 11.3903 5.80937C11.3903 5.80937 11.99 6.19375 12.9257 6.44406C13.5969 6.62219 14.5013 6.65969 14.5013 6.65969V4.10219C14.1844 4.13656 13.541 4.03656 12.8822 3.70813Z"
        fill="currentColor"
      />
    </Svg>
  ),
  youtube: (props: IconProps) => (
    <Svg
      fill="currentColor"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      {...props}
    >
      <Path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" />
    </Svg>
  ),
  globe: (props: IconProps) => (
    <Svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="currentColor"
      {...props}
    >
      <Path
        d="M10 20C8.63333 20 7.34167 19.7375 6.125 19.2125C4.90833 18.6875 3.84583 17.9708 2.9375 17.0625C2.02917 16.1542 1.3125 15.0917 0.7875 13.875C0.2625 12.6583 0 11.3667 0 10C0 8.61667 0.2625 7.32083 0.7875 6.1125C1.3125 4.90417 2.02917 3.84583 2.9375 2.9375C3.84583 2.02917 4.90833 1.3125 6.125 0.7875C7.34167 0.2625 8.63333 0 10 0C11.3833 0 12.6792 0.2625 13.8875 0.7875C15.0958 1.3125 16.1542 2.02917 17.0625 2.9375C17.9708 3.84583 18.6875 4.90417 19.2125 6.1125C19.7375 7.32083 20 8.61667 20 10C20 11.3667 19.7375 12.6583 19.2125 13.875C18.6875 15.0917 17.9708 16.1542 17.0625 17.0625C16.1542 17.9708 15.0958 18.6875 13.8875 19.2125C12.6792 19.7375 11.3833 20 10 20ZM10 17.95C10.4333 17.35 10.8083 16.725 11.125 16.075C11.4417 15.425 11.7 14.7333 11.9 14H8.1C8.3 14.7333 8.55833 15.425 8.875 16.075C9.19167 16.725 9.56667 17.35 10 17.95ZM7.4 17.55C7.1 17 6.8375 16.4292 6.6125 15.8375C6.3875 15.2458 6.2 14.6333 6.05 14H3.1C3.58333 14.8333 4.1875 15.5583 4.9125 16.175C5.6375 16.7917 6.46667 17.25 7.4 17.55ZM12.6 17.55C13.5333 17.25 14.3625 16.7917 15.0875 16.175C15.8125 15.5583 16.4167 14.8333 16.9 14H13.95C13.8 14.6333 13.6125 15.2458 13.3875 15.8375C13.1625 16.4292 12.9 17 12.6 17.55ZM2.25 12H5.65C5.6 11.6667 5.5625 11.3375 5.5375 11.0125C5.5125 10.6875 5.5 10.35 5.5 10C5.5 9.65 5.5125 9.3125 5.5375 8.9875C5.5625 8.6625 5.6 8.33333 5.65 8H2.25C2.16667 8.33333 2.10417 8.6625 2.0625 8.9875C2.02083 9.3125 2 9.65 2 10C2 10.35 2.02083 10.6875 2.0625 11.0125C2.10417 11.3375 2.16667 11.6667 2.25 12ZM7.65 12H12.35C12.4 11.6667 12.4375 11.3375 12.4625 11.0125C12.4875 10.6875 12.5 10.35 12.5 10C12.5 9.65 12.4875 9.3125 12.4625 8.9875C12.4375 8.6625 12.4 8.33333 12.35 8H7.65C7.6 8.33333 7.5625 8.6625 7.5375 8.9875C7.5125 9.3125 7.5 9.65 7.5 10C7.5 10.35 7.5125 10.6875 7.5375 11.0125C7.5625 11.3375 7.6 11.6667 7.65 12ZM14.35 12H17.75C17.8333 11.6667 17.8958 11.3375 17.9375 11.0125C17.9792 10.6875 18 10.35 18 10C18 9.65 17.9792 9.3125 17.9375 8.9875C17.8958 8.6625 17.8333 8.33333 17.75 8H14.35C14.4 8.33333 14.4375 8.6625 14.4625 8.9875C14.4875 9.3125 14.5 9.65 14.5 10C14.5 10.35 14.4875 10.6875 14.4625 11.0125C14.4375 11.3375 14.4 11.6667 14.35 12ZM13.95 6H16.9C16.4167 5.16667 15.8125 4.44167 15.0875 3.825C14.3625 3.20833 13.5333 2.75 12.6 2.45C12.9 3 13.1625 3.57083 13.3875 4.1625C13.6125 4.75417 13.8 5.36667 13.95 6ZM8.1 6H11.9C11.7 5.26667 11.4417 4.575 11.125 3.925C10.8083 3.275 10.4333 2.65 10 2.05C9.56667 2.65 9.19167 3.275 8.875 3.925C8.55833 4.575 8.3 5.26667 8.1 6ZM3.1 6H6.05C6.2 5.36667 6.3875 4.75417 6.6125 4.1625C6.8375 3.57083 7.1 3 7.4 2.45C6.46667 2.75 5.6375 3.20833 4.9125 3.825C4.1875 4.44167 3.58333 5.16667 3.1 6Z"
        fill="currentColor"
      />
    </Svg>
  ),
  ellipses: (props: IconProps) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 12C4 10.8954 4.89543 10 6 10C7.10457 10 8 10.8954 8 12C8 13.1046 7.10457 14 6 14C4.89543 14 4 13.1046 4 12ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM18 10C16.8954 10 16 10.8954 16 12C16 13.1046 16.8954 14 18 14C19.1046 14 20 13.1046 20 12C20 10.8954 19.1046 10 18 10Z"
        fill="currentColor"
      />
    </Svg>
  ),
  dots: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M9 9.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1M3.25 9.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1M14.75 9.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"
      ></Path>
    </Svg>
  ),
  dotsBold: (props: IconProps) => (
    <Svg width="25" height="25" viewBox="0 0 25 25" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.77344 12.8398C4.77344 11.7353 5.66887 10.8398 6.77344 10.8398C7.87801 10.8398 8.77344 11.7353 8.77344 12.8398C8.77344 13.9444 7.87801 14.8398 6.77344 14.8398C5.66887 14.8398 4.77344 13.9444 4.77344 12.8398ZM10.7734 12.8398C10.7734 11.7353 11.6689 10.8398 12.7734 10.8398C13.878 10.8398 14.7734 11.7353 14.7734 12.8398C14.7734 13.9444 13.878 14.8398 12.7734 14.8398C11.6689 14.8398 10.7734 13.9444 10.7734 12.8398ZM18.7734 10.8398C17.6689 10.8398 16.7734 11.7353 16.7734 12.8398C16.7734 13.9444 17.6689 14.8398 18.7734 14.8398C19.878 14.8398 20.7734 13.9444 20.7734 12.8398C20.7734 11.7353 19.878 10.8398 18.7734 10.8398Z"
        fill="currentColor"
      />
    </Svg>
  ),
  minus: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M3.25 9h11.5"
      ></Path>
    </Svg>
  ),
  twitter: (props: IconProps) => (
    <Svg viewBox="0 0 512 512" fill="currentColor" {...props}>
      <Path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
    </Svg>
  ),
  google: (props: IconProps) => (
    <Svg viewBox="0 0 24 24" {...props}>
      <Path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <Path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <Path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <Path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </Svg>
  ),
  facebook: (props: IconProps) => (
    <Svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <Path d="M12 0C5.372 0 0 5.372 0 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-2.99 1.791-4.669 4.532-4.669 1.313 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12 24 5.372 18.628 0 12 0z" />
    </Svg>
  ),
  apple: (props: IconProps) => (
    <Svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <Path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </Svg>
  ),
  sidebarRight: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M9.75 2.75v12.5M14.25 2.75H3.75a2 2 0 0 0-2 2v8.5a2 2 0 0 0 2 2h10.5a2 2 0 0 0 2-2v-8.5a2 2 0 0 0-2-2M13.75 6.25h-1.5M13.75 9h-1.5M13.75 11.75h-1.5"
      ></Path>
    </Svg>
  ),
  pieChart2: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M9 1.75V9M14.411 4.174 9 9M13.106 14.975 9 9M9 16.25a7.25 7.25 0 1 0 0-14.5 7.25 7.25 0 0 0 0 14.5"
      ></Path>
    </Svg>
  ),
  pieChart2Active: (props: IconProps) => (
    <Svg width="25" height="24" viewBox="0 0 25 24" fill="none" {...props}>
      <Path
        d="M12.987 21.6666C18.3257 21.6666 22.6536 17.3387 22.6536 11.9999C22.6536 6.66117 18.3257 2.33325 12.987 2.33325C7.64823 2.33325 3.32031 6.66117 3.32031 11.9999C3.32031 17.3387 7.64823 21.6666 12.987 21.6666Z"
        fill="currentColor"
      />
      <Path
        d="M12.9868 2.33325V11.9999"
        stroke="strokeCurrentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20.2015 5.56543L12.9868 12.0001"
        stroke="strokeCurrentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.4615 19.9667L12.9868 12"
        stroke="strokeCurrentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  chartLine: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m2.75 10.75 3.646-3.646a.5.5 0 0 1 .707 0l3.293 3.293a.5.5 0 0 0 .707 0l4.146-4.146"
      ></Path>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M2.75 2.75v10a2 2 0 0 0 2 2h10.5"
      ></Path>
    </Svg>
  ),
  chartLineActive: (props: IconProps) => (
    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...props}>
      <Path
        d="M14.5879 0.336914C16.3049 0.424013 17.6707 1.84441 17.6709 3.58301V14.4209C17.6707 16.2155 16.2155 17.6707 14.4209 17.6709H3.58301C1.84441 17.6707 0.424013 16.3049 0.336914 14.5879L0.333008 14.4209V3.58301C0.333239 1.78842 1.78842 0.333239 3.58301 0.333008H14.4209L14.5879 0.336914ZM16.3535 4.98047C16.0607 4.68763 15.5859 4.68774 15.293 4.98047L14.6152 5.65723L13.2617 7.01172L11.083 9.18945L7.44727 5.55371C7.17267 5.27912 6.73794 5.26167 6.44336 5.50195L6.38672 5.55371L3.46973 8.46973L2.01172 9.92871L1.28223 10.6572C0.98955 10.9501 0.989549 11.4249 1.28223 11.7178C1.57507 12.0106 2.04989 12.0105 2.34277 11.7178L3.07227 10.9893L4.53027 9.53027L6.91602 7.14355L10.5527 10.7803C10.8456 11.0731 11.3204 11.073 11.6133 10.7803L14.3223 8.07227L15.6758 6.71777L16.3535 6.04102C16.6462 5.74818 16.6461 5.27333 16.3535 4.98047Z"
        fill="currentColor"
      />
    </Svg>
  ),
  posts: (props: IconProps) => (
    <Svg width="16" height="16" fill="none" viewBox="0 0 16 16" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M11.778 2.444H4.222c-.982 0-1.778.796-1.778 1.778v7.556c0 .981.796 1.777 1.778 1.777h7.556c.981 0 1.777-.796 1.777-1.777V4.222c0-.982-.796-1.778-1.777-1.778M5.111 10.889h3.111M5.111 8.222h5.778"
      ></Path>
      <Path
        fill="currentColor"
        d="M5.333 6.222a.889.889 0 1 0 0-1.778.889.889 0 0 0 0 1.778"
      ></Path>
    </Svg>
  ),
  postsActive: (props: IconProps) => (
    <Svg width="25" height="25" viewBox="0 0 25 25" fill="none" {...props}>
      <Path
        d="M18.4033 3.69019H7.06999C5.59723 3.69019 4.40332 4.88409 4.40332 6.35685V17.6902C4.40332 19.1629 5.59723 20.3569 7.06999 20.3569H18.4033C19.8761 20.3569 21.07 19.1629 21.07 17.6902V6.35685C21.07 4.88409 19.8761 3.69019 18.4033 3.69019Z"
        fill="currentColor"
      />
      <Path
        d="M8.40332 16.3567H13.07"
        stroke="strokeCurrentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.40332 12.3567H17.07"
        stroke="strokeCurrentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.73665 9.35685C9.47303 9.35685 10.07 8.7599 10.07 8.02352C10.07 7.28714 9.47303 6.69019 8.73665 6.69019C8.00027 6.69019 7.40332 7.28714 7.40332 8.02352C7.40332 8.7599 8.00027 9.35685 8.73665 9.35685Z"
        fill="#strokeCurrentColor"
      />
    </Svg>
  ),
  messageContent: (props: IconProps) => (
    <Svg width="25" height="24" viewBox="0 0 25 24" fill="none" {...props}>
      <Path
        d="M12.4997 2.33334C7.16101 2.33334 2.83301 6.66134 2.83301 12C2.83301 13.7587 3.31034 15.4027 4.13034 16.8227C4.70367 17.8973 4.05967 20.4387 2.83301 21.6667C4.49967 21.7573 6.69567 21.004 7.67701 20.3693C8.32901 20.7453 9.36234 21.244 10.7157 21.5C11.293 21.6093 11.8903 21.6667 12.4997 21.6667C17.8383 21.6667 22.1663 17.3387 22.1663 12C22.1663 6.66134 17.8383 2.33334 12.4997 2.33334Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.16699 9.66666H16.8337"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.16699 14.3333H14.167"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  messageContentActive: (props: IconProps) => (
    <Svg width="25" height="24" viewBox="0 0 25 24" fill="none" {...props}>
      <Path
        d="M12.501 1.58301C18.2535 1.58345 22.917 6.24837 22.917 12.001C22.9166 17.7532 18.2532 22.4166 12.501 22.417C12.0088 22.417 11.5226 22.3826 11.0479 22.3154L10.5771 22.2373C9.36065 22.0072 8.38458 21.5942 7.6875 21.2295C7.14673 21.5184 6.45296 21.798 5.72266 22.0107C4.79701 22.2804 3.74099 22.4675 2.79297 22.416C2.49787 22.3999 2.23973 22.2114 2.13379 21.9355C2.02796 21.6593 2.09464 21.347 2.30371 21.1377C2.7969 20.644 3.21276 19.8333 3.43262 18.9971C3.54059 18.5863 3.59355 18.1948 3.59277 17.8633C3.59187 17.5221 3.53363 17.2972 3.46973 17.1768H3.46875C2.59387 15.6534 2.08315 13.8881 2.08301 12.001C2.08301 6.2481 6.7481 1.58301 12.501 1.58301ZM8.16699 13.584C7.75278 13.584 7.41699 13.9198 7.41699 14.334C7.41726 14.748 7.75294 15.084 8.16699 15.084H14.167C14.5809 15.0838 14.9167 14.7479 14.917 14.334C14.917 13.9199 14.581 13.5842 14.167 13.584H8.16699ZM8.16699 8.91699C7.75278 8.91699 7.41699 9.25278 7.41699 9.66699C7.41726 10.081 7.75294 10.417 8.16699 10.417H16.834L16.9102 10.4131C17.2881 10.3746 17.5837 10.0551 17.584 9.66699C17.584 9.27875 17.2882 8.95941 16.9102 8.9209L16.834 8.91699H8.16699Z"
        fill="currentColor"
      />
    </Svg>
  ),
  badgeCheck2: (props: IconProps) => (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <G clipPath="url(#clip0_4498_227946)">
        <Path
          d="M17.9781 9.15365L16.2337 7.40909V4.94316C16.2337 4.28717 15.7014 3.75477 15.0455 3.75477H12.5798L10.8354 2.0102C10.3708 1.54673 9.61863 1.54673 9.15521 2.0102L7.41083 3.75477H4.94517C4.28925 3.75477 3.7569 4.28717 3.7569 4.94316V7.40909L2.01252 9.15365C1.54791 9.61713 1.54791 10.3706 2.01252 10.834L3.7569 12.5786V15.0445C3.7569 15.7005 4.28925 16.2329 4.94517 16.2329H7.41083L9.15521 17.9775C9.61982 18.441 10.372 18.441 10.8354 17.9775L12.5798 16.2329H15.0455C15.7014 16.2329 16.2337 15.7005 16.2337 15.0445V12.5786L17.9781 10.834C18.4427 10.3706 18.4427 9.61713 17.9781 9.15365Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M6.875 10.8078L8.905 13.0556L13.2639 7.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_4498_227946">
          <Rect width={20} height={20} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  ),
  badgeCheck2Active: (props: IconProps) => (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <G clipPath="url(#clip0_4498_227950)">
        <Path
          d="M8.62305 1.47955C9.33233 0.770249 10.4546 0.726584 11.2158 1.34576L11.3633 1.47858L12.8887 3.00397H15.0439C16.1138 3.00421 16.9812 3.87268 16.9814 4.94244V7.09772L18.5059 8.62213L18.6387 8.76959C19.2607 9.53054 19.2162 10.654 18.5059 11.3633L16.9814 12.8887V15.044C16.9814 16.114 16.114 16.9822 15.0439 16.9825H12.8887L11.3643 18.5069C10.6076 19.2636 9.38102 19.2629 8.62402 18.5079L7.09863 16.9825H4.94336C3.87322 16.9824 3.00488 16.1141 3.00488 15.044V12.8887L1.48047 11.3643C0.722676 10.6078 0.722426 9.37848 1.48047 8.62213H1.48145L3.00488 7.09772V4.94244C3.00515 3.87259 3.87338 3.00406 4.94336 3.00397H7.09863L8.62305 1.47955ZM13.6572 6.63287C13.3313 6.37725 12.8602 6.43397 12.6045 6.75983L8.79492 11.6143L7.3623 10.0274C7.08467 9.72022 6.61007 9.69619 6.30273 9.97369C5.99537 10.2513 5.97141 10.7259 6.24902 11.0333L8.2793 13.2813C8.42748 13.4449 8.64069 13.535 8.86133 13.5274C9.08224 13.5196 9.28932 13.4152 9.42578 13.2413L13.7842 7.68561C14.0397 7.3599 13.9827 6.88865 13.6572 6.63287Z"
          fill="currentColor"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_4498_227950">
          <Rect width="20" height="20" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  ),
  notification: (props: IconProps) => (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M17.5 14.7221C16.2722 14.7221 15.2778 13.7277 15.2778 12.4999V7.22211C15.2778 4.30767 12.9144 1.94434 10 1.94434C7.08556 1.94434 4.72222 4.30767 4.72222 7.22211V12.4999C4.72222 13.7277 3.72778 14.7221 2.5 14.7221H17.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.7645 16.8725C11.6589 16.7425 11.5011 16.667 11.3333 16.667H8.66779C8.50002 16.667 8.34224 16.7425 8.23668 16.8725C8.13113 17.0025 8.09002 17.1737 8.12446 17.337C8.31668 18.2503 9.08891 18.8892 10.0011 18.8892C10.9134 18.8892 11.6856 18.2503 11.8778 17.337C11.9122 17.1737 11.87 17.0025 11.7645 16.8725Z"
        fill="currentColor"
      />
    </Svg>
  ),
  notificationActive: (props: IconProps) => (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M17.5 14.7221C16.2722 14.7221 15.2778 13.7277 15.2778 12.4999V7.22211C15.2778 4.30767 12.9144 1.94434 10 1.94434C7.08556 1.94434 4.72222 4.30767 4.72222 7.22211V12.4999C4.72222 13.7277 3.72778 14.7221 2.5 14.7221H17.5Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.7645 16.8725C11.6589 16.7425 11.5011 16.667 11.3333 16.667H8.66779C8.50002 16.667 8.34224 16.7425 8.23668 16.8725C8.13113 17.0025 8.09002 17.1737 8.12446 17.337C8.31668 18.2503 9.08891 18.8892 10.0011 18.8892C10.9134 18.8892 11.6856 18.2503 11.8778 17.337C11.9122 17.1737 11.87 17.0025 11.7645 16.8725Z"
        fill="currentColor"
      />
    </Svg>
  ),
  notificationFilled: (props: IconProps) => (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M14 11.7795C13.7665 11.7797 13.5352 11.7338 13.3194 11.6445C13.1037 11.5552 12.9076 11.4242 12.7425 11.2591C12.5773 11.0939 12.4464 10.8979 12.3571 10.6821C12.2678 10.4663 12.2219 10.2351 12.222 10.0015V5.77954C12.198 4.67571 11.7426 3.62518 10.9534 2.85301C10.1643 2.08084 9.10409 1.64844 8 1.64844C6.89591 1.64844 5.83572 2.08084 5.04656 2.85301C4.2574 3.62518 3.80203 4.67571 3.778 5.77954V10.0015C3.778 10.9835 2.982 11.7795 2 11.7795H14Z"
        fill="currentColor"
        stroke="currentColor"
      />
      <Path
        d="M9.41187 13.497C9.37049 13.4453 9.31797 13.4037 9.25823 13.3751C9.1985 13.3465 9.13309 13.3318 9.06687 13.332H6.93387C6.86779 13.3321 6.80255 13.3469 6.74291 13.3754C6.68328 13.4038 6.63075 13.4453 6.58917 13.4966C6.54758 13.548 6.51799 13.608 6.50254 13.6722C6.48709 13.7365 6.48618 13.8034 6.49987 13.868C6.65287 14.598 7.27087 15.11 7.99987 15.11C8.72987 15.11 9.34787 14.599 9.50187 13.868C9.51498 13.8034 9.51372 13.7366 9.49816 13.6725C9.48261 13.6084 9.45315 13.5485 9.41187 13.497Z"
        fill="currentColor"
      />
    </Svg>
  ),
  noNotification: (props: IconProps) => (
    <Svg width="25" height="24" viewBox="0 0 25 24" fill="none" {...props}>
      <Path
        d="M18.324 6.17592C17.356 3.91725 15.1133 2.33325 12.5 2.33325C9.00267 2.33325 6.16667 5.16925 6.16667 8.66658V14.9999C6.16667 16.4733 4.97333 17.6666 3.5 17.6666H6.83333"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.167 17.6666H21.5003C20.027 17.6666 18.8337 16.4733 18.8337 14.9999V10.3333"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.6176 20.2467C14.491 20.0907 14.3016 20 14.1003 20H10.9016C10.7003 20 10.511 20.0907 10.3843 20.2467C10.2576 20.4027 10.2083 20.608 10.2496 20.804C10.4803 21.9 11.407 22.6667 12.5016 22.6667C13.5963 22.6667 14.523 21.9 14.7536 20.804C14.795 20.608 14.7443 20.4027 14.6176 20.2467Z"
        fill="currentColor"
      />
      <Path
        d="M3.16699 21.3334L21.8337 2.66675"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  openEnvelope: (props: IconProps) => (
    <Svg width={16} height={17} viewBox="0 0 16 17" fill="none" {...props}>
      <Path
        d="M1.55554 6.49994C1.55554 5.85283 1.90754 5.29016 2.47465 4.97728L7.57065 2.16572C7.83821 2.01816 8.16176 2.01816 8.42932 2.16572L13.5253 4.97728C14.0924 5.29016 14.4444 5.85194 14.4444 6.49994"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.4444 6.50356V12.2778C14.4444 13.26 13.6489 14.0556 12.6667 14.0556H3.33332C2.3511 14.0556 1.55554 13.26 1.55554 12.2778V6.5L7.61332 9.42444C7.85776 9.54267 8.14221 9.54267 8.38576 9.42444L14.4435 6.5L14.4444 6.50356Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  closeEnvelope: (props: IconProps) => (
    <Svg width={16} height={17} viewBox="0 0 16 17" fill="none" {...props}>
      <Path
        d="M1.55554 5.61108L7.57065 8.92931C7.83821 9.07686 8.16176 9.07686 8.42932 8.92931L14.4444 5.61108"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.33335 13.6111L12.6667 13.6111C13.6485 13.6111 14.4445 12.8151 14.4445 11.8333L14.4445 5.16664C14.4445 4.1848 13.6485 3.38886 12.6667 3.38886L3.33335 3.38886C2.35151 3.38886 1.55557 4.1848 1.55557 5.16664L1.55557 11.8333C1.55557 12.8151 2.35151 13.6111 3.33335 13.6111Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),

  volume: (props: IconProps) => (
    <Svg width="25" height="24" viewBox="0 0 25 24" fill="none" {...props}>
      <G clipPath="url(#clip0_6926_58621)">
        <Path
          d="M7.16667 7.66677H3.5C2.396 7.66677 1.5 8.56277 1.5 9.66677V14.3334C1.5 15.4374 2.396 16.3334 3.5 16.3334H7.16667L14.4733 21.0108C14.9173 21.2948 15.5 20.9761 15.5 20.4494V3.5521C15.5 3.02544 14.9173 2.70677 14.4733 2.99077L7.16667 7.66677Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M19.0518 10.1147C20.0931 11.1561 20.0931 12.8441 19.0518 13.8854"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M21.6455 7.52124C24.1188 9.99457 24.1188 14.0052 21.6455 16.4786"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_6926_58621">
          <Rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0.5)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  ),
  images: (props: IconProps) => (
    <Svg width="25" height="24" viewBox="0 0 25 24" fill="none" {...props}>
      <Path
        d="M2.83301 9V17.6667C2.83301 19.14 4.02634 20.3333 5.49967 20.3333H16.833"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.50033 16.3333H19.5003C20.9731 16.3333 22.167 15.1394 22.167 13.6666V6.33331C22.167 4.86055 20.9731 3.66665 19.5003 3.66665L9.50033 3.66665C8.02757 3.66665 6.83366 4.86055 6.83366 6.33331L6.83366 13.6666C6.83366 15.1394 8.02757 16.3333 9.50033 16.3333Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.1663 9.33335C10.4317 9.33335 9.83301 8.73469 9.83301 8.00002C9.83301 7.26535 10.4317 6.66669 11.1663 6.66669C11.901 6.66669 12.4997 7.26535 12.4997 8.00002C12.4997 8.73469 11.901 9.33335 11.1663 9.33335Z"
        fill="currentColor"
      />
      <Path
        d="M9.28223 16.324L16.2236 9.39069C16.7449 8.86936 17.5889 8.86936 18.1089 9.39069L22.1662 13.448"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  imagesActive: (props: IconProps) => (
    <Svg width="25" height="24" viewBox="0 0 25 24" fill="none" {...props}>
      <Path
        d="M2.83301 9V17.6667C2.83301 19.14 4.02634 20.3333 5.49967 20.3333H16.833"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19.499 2.91602C21.3859 2.91602 22.9168 4.4462 22.917 6.33301V13.666C22.917 15.5528 21.3867 17.0827 19.5 17.083H9.5C7.61318 17.0828 6.08301 15.5529 6.08301 13.666V6.33301C6.08321 4.44647 7.61255 2.91646 9.49902 2.91602H19.499ZM18.6396 8.86035C17.8262 8.04572 16.5069 8.04777 15.6934 8.86133L12.2236 12.3271L10.4883 14.0605L9.62012 14.9268C9.3273 15.2195 9.32748 15.6943 9.62012 15.9873C9.89436 16.2617 10.3284 16.2796 10.623 16.04L10.6807 15.9883L11.5479 15.1221L16.7539 9.92188V9.9209C16.9827 9.69208 17.3515 9.69374 17.5781 9.9209H17.5791L19.6074 11.9502L20.6221 12.9639L21.1289 13.4717L21.1865 13.5234C21.4809 13.7631 21.915 13.7456 22.1895 13.4717C22.464 13.1971 22.4814 12.7624 22.2412 12.4678L22.1895 12.4111L21.6826 11.9033L20.668 10.8896L18.6396 8.86035ZM11.167 6.66699C10.4323 6.66699 9.83301 7.26533 9.83301 8C9.8331 8.73459 10.4324 9.33301 11.167 9.33301C11.9014 9.33279 12.4999 8.73446 12.5 8C12.5 7.26547 11.9015 6.66721 11.167 6.66699Z"
        fill="currentColor"
      />
    </Svg>
  ),
  community: (props: IconProps) => (
    <Svg width="16" height="16" fill="none" viewBox="0 0 16 16" {...props}>
      <G
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        clipPath="url(#clip0_5344_217)"
      >
        <Path d="M4.045 9.556a1.778 1.778 0 1 0 0-3.556 1.778 1.778 0 0 0 0 3.556M.667 14.222a3.557 3.557 0 0 1 6.757 0M14 .667H9.111c-.736 0-1.333.597-1.333 1.333v3.111c0 .736.597 1.334 1.333 1.334h.445V9.11L12 6.445h2c.736 0 1.333-.598 1.333-1.334v-3.11c0-.737-.597-1.334-1.333-1.334"></Path>
      </G>
      <Defs>
        <ClipPath id="clip0_5344_217">
          <Path fill="#fff" d="M0 0h16v16H0z"></Path>
        </ClipPath>
      </Defs>
    </Svg>
  ),
  mute: (props: IconProps) => (
    <Svg width="17" height="17" viewBox="0 0 17 17" fill="none" {...props}>
      <G clipPath="url(#clip0_11008_151708)">
        <Path
          d="M12.7222 5.07146V2.86791C12.7222 2.51679 12.3338 2.30435 12.0378 2.49368L7.16667 5.6119H3.83333C3.09733 5.6119 2.5 6.20924 2.5 6.94524V10.0563C2.5 10.7923 3.09733 11.3897 3.83333 11.3897H6.17111"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M8.5 12.2423L12.0387 14.5072C12.3347 14.6966 12.7231 14.4841 12.7231 14.133V8.15967"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M2.94531 14.5L15.3898 2.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_11008_151708">
          <Rect
            width="16"
            height="16"
            fill="white"
            transform="translate(0.5 0.5)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  ),

  communityActive: (props: IconProps) => (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M5.05669 11.9444C6.28399 11.9444 7.27892 10.9495 7.27892 9.72222C7.27892 8.49492 6.28399 7.5 5.05669 7.5C3.8294 7.5 2.83447 8.49492 2.83447 9.72222C2.83447 10.9495 3.8294 11.9444 5.05669 11.9444Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M0.833313 17.7782C1.41665 16.0038 3.08665 14.7227 5.05665 14.7227C7.02665 14.7227 8.69665 16.0038 9.27998 17.7782"
        fill="currentColor"
      />
      <Path
        d="M0.833313 17.7782C1.41665 16.0038 3.08665 14.7227 5.05665 14.7227C7.02665 14.7227 8.69665 16.0038 9.27998 17.7782H0.833313Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.5 0.833008H11.3889C10.4689 0.833008 9.72223 1.57967 9.72223 2.49967V6.38856C9.72223 7.30856 10.4689 8.05523 11.3889 8.05523H11.9445V11.3886L15 8.05523H17.5C18.42 8.05523 19.1667 7.30856 19.1667 6.38856V2.49967C19.1667 1.57967 18.42 0.833008 17.5 0.833008Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  live: (props: IconProps) => (
    <Svg width="16" height="16" fill="none" viewBox="0 0 16 16" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M8 9.555a1.556 1.556 0 1 0 0-3.11 1.556 1.556 0 0 0 0 3.11M5.014 10.986a4.223 4.223 0 0 1 0-5.972M3.129 12.871a6.89 6.89 0 0 1 0-9.742M10.986 10.986a4.223 4.223 0 0 0 0-5.972M12.871 12.871a6.89 6.89 0 0 0 0-9.742"
      ></Path>
    </Svg>
  ),
  smile: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M9 16.25a7.25 7.25 0 1 0 0-14.5 7.25 7.25 0 0 0 0 14.5"
      ></Path>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12.749 11A4.25 4.25 0 0 1 9 13.25 4.25 4.25 0 0 1 5.251 11"
      ></Path>
      <Path
        fill="currentColor"
        d="M7 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2M11 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
      ></Path>
    </Svg>
  ),
  twitch: (props: IconProps) => (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M2.5 1L1.5 3.5V13H4.5V15H6.5L8.5 13H11L14.5 9.5V1H2.5ZM13 9L11 11H8L6 13V11H3.5V2.5H13V9Z"
        fill="currentColor"
      />
      <Path d="M11.5 4.46875H10V8.5H11.5V4.46875Z" fill="currentColor" />
      <Path d="M8 4.46875H6.5V8.5H8V4.46875Z" fill="currentColor" />
    </Svg>
  ),
  fire: (props: IconProps) => (
    <Svg width="19" height="18" viewBox="0 0 19 18" fill="none" {...props}>
      <Path
        d="M7.46191 16.25C7.18191 13.5 9.26491 14.153 9.33691 11.749C10.9179 12.6 11.5759 14.736 11.5369 16.214"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.5371 16.214C15.4381 14.698 16.2621 10.381 13.5011 6.36401"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.0329 7.37C11.0329 7.37 11.7289 3.604 8.98888 1.75C8.62488 6.125 3.87988 6.281 3.87988 10.987C3.87988 13.104 4.97588 15.389 7.46188 16.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  bicep: (props: IconProps) => (
    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...props}>
      <Path
        d="M5.22395 5.671C4.47095 8.777 6.30595 9.095 7.04795 10.868C8.09395 9.629 11.6779 8.221 13.9859 9.405C16.2939 10.589 16.5409 13.836 14.6629 15.069C13.5559 15.795 11.8599 16.243 10.3409 16.244C8.60995 16.288 7.36095 16.108 6.81795 15.836C5.91995 15.951 4.02295 15.938 3.24795 15.149C2.71595 14.608 1.62995 11.503 2.28095 8.191C2.97195 4.695 4.12495 1.751 5.36995 1.751C5.97995 1.751 6.97095 1.771 7.43395 2.146C7.89695 2.521 7.68295 3.342 7.41895 3.794C7.74195 4.053 7.81095 4.518 7.57795 4.86C7.20195 5.288 6.71295 5.601 6.16695 5.763C5.85395 5.848 5.47995 5.747 5.22395 5.671Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.75 13C10.188 13.506 12.035 13.129 13.25 12.297"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  basketBall: (props: IconProps) => (
    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...props}>
      <Path
        d="M8.65195 1.759C8.15795 2.196 5.25595 4.85 5.15595 9.218C5.06995 12.977 7.11495 15.509 7.63895 16.121"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.77002 9.532C2.96102 9.943 4.39502 10.314 6.03802 10.499C10.517 11.003 14.173 9.857 16.25 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.14697 13.277C3.14697 13.277 4.29397 12.609 5.66697 12.609C7.86997 12.609 10.333 14.896 13.905 14.336"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.14697 4.722C3.84397 6.25 3.29197 7.924 5.27097 7.924C9.33397 7.924 9.99997 3.937 14.189 3.937"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 16.25C13.0041 16.25 16.25 13.0041 16.25 9C16.25 4.99594 13.0041 1.75 9 1.75C4.99594 1.75 1.75 4.99594 1.75 9C1.75 13.0041 4.99594 16.25 9 16.25Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  helmet: (props: IconProps) => (
    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...props}>
      <Path
        d="M9 1.75C8.838 1.75 8.674 1.756 8.51 1.769C5.311 2.011 2.768 4.554 2.526 7.753L2.055 13.138C2.022 13.512 2.21 13.871 2.535 14.059L6.249 16.251V10.911L4.749 10.363V7.828L8.574 8.66C8.854 8.721 9.144 8.721 9.424 8.66L13.249 7.828V10.363L11.749 10.911V16.251L15.463 14.059C15.789 13.872 15.976 13.512 15.943 13.138L15.472 7.753C15.23 4.554 12.687 2.011 9.488 1.769C9.324 1.757 9.16 1.75 8.998 1.75H9Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  mug: (props: IconProps) => (
    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...props}>
      <Path
        d="M14.0331 7.25H15.7501C16.3021 7.25 16.7501 7.698 16.7501 8.25V9.75C16.7501 10.855 15.8551 11.75 14.7501 11.75H13.6411"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4.84092 4.75H13.1589C13.7449 4.75 14.2059 5.252 14.1549 5.837L13.4079 14.424C13.3179 15.458 12.4529 16.251 11.4159 16.251H6.58392C5.54692 16.251 4.68092 15.458 4.59192 14.424L3.84492 5.837C3.79392 5.253 4.25492 4.75 4.84092 4.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7 2C7.127 1.96 7.406 1.854 7.646 1.583C7.941 1.25 7.989 0.877 8 0.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.25 2C10.377 1.96 10.656 1.854 10.896 1.583C11.191 1.25 11.239 0.877 11.25 0.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 12.5C10.1046 12.5 11 11.6046 11 10.5C11 9.39543 10.1046 8.5 9 8.5C7.89543 8.5 7 9.39543 7 10.5C7 11.6046 7.89543 12.5 9 12.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  lipstick: (props: IconProps) => (
    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...props}>
      <Path
        d="M7.25 7.75V3.29C7.25 3.111 7.346 2.945 7.502 2.856L10.002 1.427C10.335 1.237 10.75 1.477 10.75 1.861V7.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.75 10.75V8.75C5.75 8.198 6.198 7.75 6.75 7.75H11.25C11.802 7.75 12.25 8.198 12.25 8.75V10.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.75 10.75H12.25C12.802 10.75 13.25 11.198 13.25 11.75V14.25C13.25 15.354 12.354 16.25 11.25 16.25H6.75C5.646 16.25 4.75 15.354 4.75 14.25V11.75C4.75 11.198 5.198 10.75 5.75 10.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  controller: (props: IconProps) => (
    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...props}>
      <Path
        d="M10.75 8C11.1642 8 11.5 7.66421 11.5 7.25C11.5 6.83579 11.1642 6.5 10.75 6.5C10.3358 6.5 10 6.83579 10 7.25C10 7.66421 10.3358 8 10.75 8Z"
        fill="currentColor"
      />
      <Path
        d="M13.75 8C14.1642 8 14.5 7.66421 14.5 7.25C14.5 6.83579 14.1642 6.5 13.75 6.5C13.3358 6.5 13 6.83579 13 7.25C13 7.66421 13.3358 8 13.75 8Z"
        fill="currentColor"
      />
      <Path
        d="M12.25 6.75C12.6642 6.75 13 6.41421 13 6C13 5.58579 12.6642 5.25 12.25 5.25C11.8358 5.25 11.5 5.58579 11.5 6C11.5 6.41421 11.8358 6.75 12.25 6.75Z"
        fill="currentColor"
      />
      <Path
        d="M12.25 9.25C12.6642 9.25 13 8.91421 13 8.5C13 8.08579 12.6642 7.75 12.25 7.75C11.8358 7.75 11.5 8.08579 11.5 8.5C11.5 8.91421 11.8358 9.25 12.25 9.25Z"
        fill="currentColor"
      />
      <Path
        d="M5.75 6V8.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7 7.25H4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.22998 11.75H11.769"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.75 13C6.57843 13 7.25 12.3284 7.25 11.5C7.25 10.6716 6.57843 10 5.75 10C4.92157 10 4.25 10.6716 4.25 11.5C4.25 12.3284 4.92157 13 5.75 13Z"
        fill="currentColor"
      />
      <Path
        d="M12.25 13C13.0784 13 13.75 12.3284 13.75 11.5C13.75 10.6716 13.0784 10 12.25 10C11.4216 10 10.75 10.6716 10.75 11.5C10.75 12.3284 11.4216 13 12.25 13Z"
        fill="currentColor"
      />
      <Path
        d="M14.173 13.435C14.44 13.952 14.992 14.297 15.625 14.245C16.427 14.18 17.006 13.44 17 12.636C16.992 11.451 16.832 10.009 16.542 8.375C15.871 4.588 14.424 2.75 12.5 2.75C11.615 2.75 10.828 3.14 10.279 3.75H9.00003H7.72103C7.17203 3.14 6.38503 2.75 5.50003 2.75C3.57603 2.75 2.12903 4.588 1.45803 8.375C1.16903 10.009 1.00803 11.45 1.00003 12.636C0.995032 13.44 1.57403 14.18 2.37503 14.245C3.00803 14.297 3.56003 13.951 3.82703 13.435"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  openBook: (props: IconProps) => (
    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...props}>
      <Path
        d="M9.00002 15.051C9.17002 15.051 9.33902 15.006 9.49402 14.917C10.137 14.546 11.226 14.07 12.635 14.072C13.534 14.073 14.302 14.269 14.905 14.507C15.553 14.762 16.249 14.267 16.249 13.57V4.487C16.249 4.133 16.068 3.807 15.763 3.627C15.126 3.251 14.037 2.764 12.623 2.764C10.733 2.764 9.42502 3.636 8.99902 3.946"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.9963 6.9204C13.583 6.825 13.1234 6.764 12.6231 6.764C12.1228 6.764 11.6632 6.8251 11.25 6.9207"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.9963 10.4204C13.583 10.325 13.1234 10.264 12.6231 10.264C12.1228 10.264 11.6632 10.3251 11.25 10.4207"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.99998 15.051C8.82998 15.051 8.66098 15.006 8.50598 14.917C7.86298 14.546 6.77398 14.07 5.36498 14.072C4.46598 14.073 3.69798 14.269 3.09498 14.507C2.44698 14.762 1.75098 14.27 1.75098 13.574V4.484C1.75098 4.13 1.93198 3.808 2.23698 3.628C2.87398 3.252 3.96298 2.765 5.37698 2.765C7.26698 2.765 8.57498 3.637 9.00098 3.947V15.051H8.99998Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  chefHat: (props: IconProps) => (
    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...props}>
      <Path
        d="M4.75 13.75H13.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.75 12V13.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.25 12V13.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.91207 3.983C5.37307 3.753 4.76707 3.682 4.12007 3.815C2.94807 4.056 2.00207 5.033 1.79707 6.212C1.46807 8.106 2.91707 9.75 4.75007 9.75V15.25C4.75007 15.802 5.19807 16.25 5.75007 16.25H12.2501C12.8021 16.25 13.2501 15.802 13.2501 15.25V9.75C15.0821 9.75 16.5311 8.107 16.2041 6.214C16.0001 5.034 15.0541 4.057 13.8821 3.815C13.2341 3.681 12.6281 3.752 12.0881 3.982"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.75 5C5.75 3.205 7.205 1.75 9 1.75C10.795 1.75 12.25 3.205 12.25 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  slides: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M13.25 5.25h3M1.75 5.25h7M11 7.5A2.25 2.25 0 1 0 11 3a2.25 2.25 0 0 0 0 4.5M4.75 12.75h-3M16.25 12.75h-7M7 15a2.25 2.25 0 1 0 0-4.5A2.25 2.25 0 0 0 7 15"
      ></Path>
    </Svg>
  ),
  trash: (props: IconProps) => (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M13.1109 5.55554V11.7778C13.1109 12.76 12.3153 13.5555 11.3331 13.5555H4.66645C3.68423 13.5555 2.88867 12.76 2.88867 11.7778V5.55554"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.5557 2.44446H2.44455C1.95363 2.44446 1.55566 2.84243 1.55566 3.33335V4.66668C1.55566 5.1576 1.95363 5.55557 2.44455 5.55557H13.5557C14.0466 5.55557 14.4446 5.1576 14.4446 4.66668V3.33335C14.4446 2.84243 14.0466 2.44446 13.5557 2.44446Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.22266 8.22223H9.77821"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  eyeSlash: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        fill="currentColor"
        d="M7.409 10.591a2.25 2.25 0 1 1 3.182-3.182"
      ></Path>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M7.409 10.591a2.25 2.25 0 1 1 3.182-3.182M14.938 6.597c.401.45.725.89.974 1.27.45.683.45 1.582 0 2.265C14.894 11.675 12.65 14.25 9 14.25a7.4 7.4 0 0 1-1.552-.162"
      ></Path>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M4.956 13.044c-1.356-.876-2.302-2.053-2.868-2.912a2.07 2.07 0 0 1 0-2.265C3.106 6.324 5.35 3.749 9 3.749c1.62 0 2.964.507 4.044 1.206M2 16 16 2"
      ></Path>
    </Svg>
  ),
  eye: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M2.088 10.132a2.07 2.07 0 0 1 0-2.265C3.106 6.324 5.35 3.749 9 3.749s5.896 2.574 6.913 4.118c.45.683.45 1.582 0 2.265C14.894 11.675 12.65 14.25 9 14.25s-5.895-2.574-6.912-4.118"
      ></Path>
      <Path
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M9 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5"
      ></Path>
    </Svg>
  ),
  messageBlast: (props: IconProps) => (
    <Svg width="16" height="16" fill="none" viewBox="0 0 16 16" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M3.778 4.889 8.64 7.928c.288.18.654.18.942 0l4.862-3.04"
      ></Path>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M5.111 11.333h8c.736 0 1.333-.597 1.333-1.333V4.667c0-.737-.597-1.334-1.333-1.334h-8c-.736 0-1.333.597-1.333 1.334V10c0 .736.597 1.333 1.333 1.333"
      ></Path>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M10.889 13.556H5.111A3.556 3.556 0 0 1 1.556 10V6.889"
      ></Path>
    </Svg>
  ),
  leftArrow: (props: IconProps) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Line
        x1="20"
        y1="12"
        x2="7"
        y2="12"
        stroke="currentColor"
        strokeWidth="2"
      />
      <Line
        x1="11.7071"
        y1="6.70711"
        x2="5.70711"
        y2="12.7071"
        stroke="currentColor"
        strokeWidth="2"
      />
      <Line
        y1="-1"
        x2="8.48528"
        y2="-1"
        transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 11 18)"
        stroke="currentColor"
        strokeWidth="2"
      />
    </Svg>
  ),
  copy: (props: IconProps) => (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <G clipPath="url(#clip0_13524_106106)">
        <Path
          d="M3.33301 11.3335L9.55523 11.3335C10.5371 11.3335 11.333 10.5376 11.333 9.55572L11.333 3.3335C11.333 2.35166 10.5371 1.55572 9.55523 1.55572L3.33301 1.55572C2.35117 1.55572 1.55523 2.35166 1.55523 3.3335L1.55523 9.55572C1.55523 10.5376 2.35117 11.3335 3.33301 11.3335Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M13.5105 5.33496L14.4251 11.4896C14.5691 12.4612 13.8989 13.3652 12.9283 13.5092L6.77359 14.4238C5.94426 14.5474 5.1647 14.0772 4.86426 13.3323"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_13524_106106">
          <Rect width="16" height="16" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  ),
  copy2: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M4.75 12.25h-1a2 2 0 0 1-2-2v-5.5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 2 2v1"
      ></Path>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6.75 15.25h7.5a2 2 0 0 0 2-2v-5.5a2 2 0 0 0-2-2h-7.5a2 2 0 0 0-2 2v5.5a2 2 0 0 0 2 2"
      ></Path>
    </Svg>
  ),
  qrCode: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6.75 2.75h-3a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1M14.25 2.75h-3a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1M6.75 10.25h-3a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1"
      ></Path>
      <Path
        fill="currentColor"
        d="M6 4.5H4.5V6H6zM13.5 4.5H12V6h1.5zM6 12H4.5v1.5H6zM16 14.5h-1.5V16H16zM14.5 13H13v1.5h1.5zM16 11.5h-1.5V13H16zM13 14.5h-2V16h2zM11 11.5H9.5v3H11zM14.5 10H11v1.5h3.5z"
      ></Path>
    </Svg>
  ),
  download4: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M15.25 11.75v1.5a2 2 0 0 1-2 2h-8.5a2 2 0 0 1-2-2v-1.5M5.5 6.75l3.5 3.5 3.5-3.5M9 10.25v-7.5"
      ></Path>
    </Svg>
  ),
  shareRight: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M14.25 10.75v2.5a2 2 0 0 1-2 2h-7.5a2 2 0 0 1-2-2v-7.5a2 2 0 0 1 2-2h3.5M13 1.75 16.25 5 13 8.25"
      ></Path>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M16 5h-3.25a4 4 0 0 0-4 4"
      ></Path>
    </Svg>
  ),
  darkTheme: (props: IconProps) => (
    <Svg width="16" height="16" fill="none" viewBox="0 0 16 16" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M11.556 10.445A5.555 5.555 0 0 1 6 4.889c0-1.202.385-2.31 1.033-3.22a6.443 6.443 0 0 0 1.19 12.776c2.997 0 5.509-2.05 6.23-4.822a5.5 5.5 0 0 1-2.897.822"
      ></Path>
    </Svg>
  ),
  lightTheme: (props: IconProps) => (
    <Svg width="16" height="16" fill="none" viewBox="0 0 16 16" {...props}>
      <G
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        clipPath="url(#clip0_5487_1545)"
      >
        <Path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6M8 1v1M12.95 3.05l-.707.707M15 8h-1M12.95 12.95l-.707-.707M8 15v-1M3.05 12.95l.707-.707M1 8h1M3.05 3.05l.707.707"></Path>
      </G>
      <Defs>
        <ClipPath id="clip0_5487_1545">
          <Path fill="#fff" d="M0 0h16v16H0z"></Path>
        </ClipPath>
      </Defs>
    </Svg>
  ),
  pause: (props: IconProps) => (
    <Svg
      width="16"
      height="16"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0"
      viewBox="0 0 512 512"
      {...props}
    >
      <Path stroke="none" d="M224 432h-80V80h80zm144 0h-80V80h80z"></Path>
    </Svg>
  ),
  bold: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        fill="currentColor"
        d="M12.653 8.471A3.98 3.98 0 0 0 14 5.5c0-2.206-1.794-4-4-4H6.25a.75.75 0 0 0 0 1.5H10c1.379 0 2.5 1.122 2.5 2.5S11.379 8 10 8H6.25a.75.75 0 0 0 0 1.5h4.5a2.75 2.75 0 0 1 2.75 2.75A2.75 2.75 0 0 1 10.75 15h-4.5a.75.75 0 0 0 0 1.5h4.5A4.255 4.255 0 0 0 15 12.25c0-1.656-.961-3.078-2.347-3.779"
      ></Path>
      <Path
        fill="currentColor"
        d="M6 1.5H4.75A1.75 1.75 0 0 0 3 3.25v11.5c0 .966.784 1.75 1.75 1.75H6z"
      ></Path>
    </Svg>
  ),
  italic: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m8.25 14.25 2.5-8.5h-2.5"
      ></Path>
      <Path fill="currentColor" d="M12 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2"></Path>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M5.75 14.25h5"
      ></Path>
    </Svg>
  ),
  strikethrough: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12.999 11.336c.09.274.145.579.153.919.05 2.076-1.817 3.495-4.074 3.495-2.157 0-3.655-.84-4.234-2.736M12.775 4.626C11.956 2.689 10.32 2.25 9.08 2.25c-1.152 0-4.174.612-3.894 3.515.196 2.037 2.117 2.796 3.794 3.095q.333.058.694.139M2 9h14"
      ></Path>
    </Svg>
  ),
  undo: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M3 10c.528-.461 2.7-2.251 6-2.251s5.472 1.79 6 2.251"
      ></Path>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M4.625 5.598 3 10l4.53 1.222"
      ></Path>
    </Svg>
  ),
  redo: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M15 10c-.528-.461-2.7-2.251-6-2.251S3.528 9.539 3 10"
      ></Path>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M13.374 5.598 14.999 10l-4.53 1.222"
      ></Path>
    </Svg>
  ),
  clock: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M9 16.25a7.25 7.25 0 1 0 0-14.5 7.25 7.25 0 0 0 0 14.5"
      ></Path>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M9 4.75V9l3.25 2.25"
      ></Path>
    </Svg>
  ),
  compose: (props: IconProps) => (
    <Svg width="25" height="24" viewBox="0 0 25 24" fill="none" {...props}>
      <Path
        d="M20.8334 11.6667V17.6667C20.8334 19.14 19.64 20.3334 18.1667 20.3334H6.83335C5.36002 20.3334 4.16669 19.14 4.16669 17.6667V6.33335C4.16669 4.86002 5.36002 3.66669 6.83335 3.66669H12.8334"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.5 15C9.5 15 12.3267 14.84 13.2813 13.8853L21.6147 5.55198C22.3507 4.81598 22.3507 3.62131 21.6147 2.88531C20.8787 2.14931 19.684 2.14931 18.948 2.88531L10.6147 11.2186C9.66 12.1733 9.5 15 9.5 15Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  grid: (props: IconProps) => (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M6.94455 3.05554H4.16678C3.55313 3.05554 3.05566 3.553 3.05566 4.16665V6.94443C3.05566 7.55808 3.55313 8.05554 4.16678 8.05554H6.94455C7.5582 8.05554 8.05566 7.55808 8.05566 6.94443V4.16665C8.05566 3.553 7.5582 3.05554 6.94455 3.05554Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.8332 3.05554H13.0554C12.4418 3.05554 11.9443 3.553 11.9443 4.16665V6.94443C11.9443 7.55808 12.4418 8.05554 13.0554 8.05554H15.8332C16.4469 8.05554 16.9443 7.55808 16.9443 6.94443V4.16665C16.9443 3.553 16.4469 3.05554 15.8332 3.05554Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.94455 11.9445H4.16678C3.55313 11.9445 3.05566 12.4419 3.05566 13.0556V15.8333C3.05566 16.447 3.55313 16.9445 4.16678 16.9445H6.94455C7.5582 16.9445 8.05566 16.447 8.05566 15.8333V13.0556C8.05566 12.4419 7.5582 11.9445 6.94455 11.9445Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.8332 11.9445H13.0554C12.4418 11.9445 11.9443 12.4419 11.9443 13.0556V15.8333C11.9443 16.447 12.4418 16.9445 13.0554 16.9445H15.8332C16.4469 16.9445 16.9443 16.447 16.9443 15.8333V13.0556C16.9443 12.4419 16.4469 11.9445 15.8332 11.9445Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  tableRows: (props: IconProps) => (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M1.94434 7.5H18.0554"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.94434 12.5H18.0554"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.8332 3.05554H4.16656C2.93926 3.05554 1.94434 4.05046 1.94434 5.27776V14.7222C1.94434 15.9495 2.93926 16.9444 4.16656 16.9444H15.8332C17.0605 16.9444 18.0554 15.9495 18.0554 14.7222V5.27776C18.0554 4.05046 17.0605 3.05554 15.8332 3.05554Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  tag: (props: IconProps) => (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M2.88889 2H7.264C7.73511 2 8.18756 2.18756 8.52089 2.52089L13.632 7.632C14.3262 8.32622 14.3262 9.45156 13.632 10.1458L10.1458 13.632C9.45156 14.3262 8.32622 14.3262 7.632 13.632L2.52089 8.52089C2.18756 8.18756 2 7.73511 2 7.264V2.88889C2 2.39822 2.39822 2 2.88889 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.55545 6.66668C6.1691 6.66668 6.66656 6.16922 6.66656 5.55557C6.66656 4.94192 6.1691 4.44446 5.55545 4.44446C4.9418 4.44446 4.44434 4.94192 4.44434 5.55557C4.44434 6.16922 4.9418 6.66668 5.55545 6.66668Z"
        fill="currentColor"
      />
    </Svg>
  ),
  circleCheck: (props: IconProps) => (
    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...props}>
      <Path
        d="M11.626 3.334C10.827 2.963 9.939 2.75 9 2.75C5.548 2.75 2.75 5.548 2.75 9C2.75 12.452 5.548 15.25 9 15.25C12.452 15.25 15.25 12.452 15.25 9C15.25 8.363 15.153 7.749 14.976 7.17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.25 7.673L9.019 10.75L15.25 2.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  expand: (props: IconProps) => (
    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...props}>
      <Path
        d="M11.25 2.75H13.25C14.355 2.75 15.25 3.645 15.25 4.75V6.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.75 15.25H4.75C3.645 15.25 2.75 14.355 2.75 13.25V11.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.75 6.75V4.75C2.75 3.645 3.645 2.75 4.75 2.75H6.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.25 11.25V13.25C15.25 14.355 14.355 15.25 13.25 15.25H11.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  delete: (props: IconProps) => (
    <Svg width="16" height="17" viewBox="0 0 16 17" fill="none" {...props}>
      <Path
        d="M11.9773 6.94446L11.6449 13.26C11.5951 14.204 10.8146 14.9445 9.86975 14.9445H6.13197C5.18619 14.9445 4.40664 14.204 4.35686 13.26L4.02441 6.94446"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.44434 4.72217H13.5554"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 4.72221V2.94443C6 2.45376 6.39822 2.05554 6.88889 2.05554H9.11111C9.60178 2.05554 10 2.45376 10 2.94443V4.72221"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.55566 8.27783L6.77789 12.2778"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.44488 8.27783L9.22266 12.2778"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  list: (props: IconProps) => (
    <Svg {...props}>
      <Path
        d="M3.33333 9.61735C4.06971 9.61735 4.66667 9.0204 4.66667 8.28402C4.66667 7.54764 4.06971 6.95068 3.33333 6.95068C2.59695 6.95068 2 7.54764 2 8.28402C2 9.0204 2.59695 9.61735 3.33333 9.61735Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.33398 8.28418H14.0007"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.33333 4.95085C4.06971 4.95085 4.66667 4.35389 4.66667 3.61751C4.66667 2.88113 4.06971 2.28418 3.33333 2.28418C2.59695 2.28418 2 2.88113 2 3.61751C2 4.35389 2.59695 4.95085 3.33333 4.95085Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.33398 3.61768H14.0007"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.33333 14.2843C4.06971 14.2843 4.66667 13.6874 4.66667 12.951C4.66667 12.2146 4.06971 11.6177 3.33333 11.6177C2.59695 11.6177 2 12.2146 2 12.951C2 13.6874 2.59695 14.2843 3.33333 14.2843Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.33398 12.9507H14.0007"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  userList: (props: IconProps) => (
    <Svg width={19} height={19} viewBox="0 0 19 19" fill="none" {...props}>
      <Path
        d="M7.42419 7.78516C8.66684 7.78516 9.67419 6.7778 9.67419 5.53516C9.67419 4.29252 8.66684 3.28516 7.42419 3.28516C6.18155 3.28516 5.17419 4.29252 5.17419 5.53516C5.17419 6.7778 6.18155 7.78516 7.42419 7.78516Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.4652 15.3512C12.3022 15.0602 12.7312 14.0942 12.3312 13.3032C11.4252 11.5122 9.57023 10.2832 7.42523 10.2832C5.28023 10.2832 3.42523 11.5112 2.51923 13.3032C2.11923 14.0942 2.54723 15.0602 3.38523 15.3512C4.41623 15.7092 5.79323 16.0342 7.42523 16.0342C9.05723 16.0342 10.4342 15.7092 11.4652 15.3512Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.8672 3.78516H12.3672"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.8672 7.28516H12.3672"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.8672 10.7852H14.1172"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  mic: (props: IconProps) => (
    <Svg width="29" height="29" viewBox="0 0 29 29" fill="none" {...props}>
      <Path
        d="M19.1531 8.61806C19.1531 5.82595 16.8897 3.5625 14.0975 3.5625C11.3054 3.5625 9.04199 5.82595 9.04199 8.61806V13.2847C9.04199 16.0768 11.3054 18.3403 14.0975 18.3403C16.8897 18.3403 19.1531 16.0768 19.1531 13.2847V8.61806Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M23.8194 13.2852C23.8194 18.6549 19.467 23.0074 14.0972 23.0074C8.72744 23.0074 4.375 18.6549 4.375 13.2852"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.0977 23.0059V26.117"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  mediaUpload: (props: IconProps) => (
    <Svg width="57" height="56" viewBox="0 0 57 56" fill="none" {...props}>
      <Path
        d="M12.2031 46.6286L31.1 27.7286C33.5298 25.2988 37.4685 25.2988 39.8982 27.7286L47.9436 35.7739"
        stroke="currentColor"
        strokeWidth="1.9294"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19.9436 26.4418C22.0914 26.4418 23.8325 24.7007 23.8325 22.553C23.8325 20.4052 22.0914 18.6641 19.9436 18.6641C17.7958 18.6641 16.0547 20.4052 16.0547 22.553C16.0547 24.7007 17.7958 26.4418 19.9436 26.4418Z"
        fill="#121212"
      />
      <Path
        d="M44.8281 3.89062V19.4462"
        stroke="currentColor"
        strokeWidth="1.9294"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M29.9334 8.55469H15.2769C11.8404 8.55469 9.05469 11.3407 9.05469 14.7769V41.2214C9.05469 44.6576 11.8404 47.4436 15.2769 47.4436H41.7214C45.1579 47.4436 47.9436 44.6576 47.9436 41.2214V26.5652"
        stroke="currentColor"
        strokeWidth="1.9294"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M52.6102 11.6641H37.0547"
        stroke="currentColor"
        strokeWidth="1.9294"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  micRegular: (props: IconProps) => (
    <Svg width="16" height="17" viewBox="0 0 16 17" fill="none" {...props}>
      <Path
        d="M10.8889 4.94443C10.8889 3.34894 9.59546 2.05554 7.99997 2.05554C6.40448 2.05554 5.11108 3.34894 5.11108 4.94443V7.6111C5.11108 9.20659 6.40448 10.5 7.99997 10.5C9.59546 10.5 10.8889 9.20659 10.8889 7.6111V4.94443Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.5556 7.61108C13.5556 10.6795 11.0685 13.1666 8.00001 13.1666C4.93157 13.1666 2.44446 10.6795 2.44446 7.61108"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 13.1666V14.9444"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  messageCheck: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <G
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        clipPath="url(#clip0_6226_19)"
      >
        <Path d="m1.75 5.75 6.767 3.733a1 1 0 0 0 .966 0L16.25 5.75"></Path>
        <Path d="M16.25 9.474V5.25a2 2 0 0 0-2-2H3.75a2 2 0 0 0-2 2v7.5a2 2 0 0 0 2 2h6.007M12.25 14.75l1.609 1.5 3.397-4.5"></Path>
      </G>
      <Defs>
        <ClipPath id="clip0_6226_19">
          <Path fill="currentColor" d="M0 0h18v18H0z"></Path>
        </ClipPath>
      </Defs>
    </Svg>
  ),
  reloadLeft: (props: IconProps) => (
    <Svg width="17" height="16" viewBox="0 0 17 16" fill="none" {...props}>
      <Path
        d="M8.50005 15.1111C6.14183 15.1111 3.94272 13.9458 2.61561 11.9929C2.4085 11.6889 2.48761 11.2738 2.7925 11.0667C3.0965 10.8605 3.51161 10.9378 3.71872 11.2436C4.79694 12.8302 6.58539 13.7778 8.50094 13.7778C11.6867 13.7778 14.2787 11.1858 14.2787 8.00003C14.2787 4.81425 11.6867 2.22225 8.50094 2.22225C6.20316 2.22225 4.12405 3.58314 3.20405 5.68892C3.05561 6.0258 2.66361 6.18047 2.32583 6.03292C1.98805 5.88536 1.83427 5.49247 1.98183 5.15469C3.11339 2.56358 5.6725 0.888916 8.50005 0.888916C12.4209 0.888916 15.6112 4.07914 15.6112 8.00003C15.6112 11.9209 12.4209 15.1111 8.50005 15.1111Z"
        fill="currentColor"
      />
      <Path
        d="M2.53293 6.22216C2.20493 6.22216 1.91959 5.98039 1.87337 5.64705L1.5107 3.02927C1.46004 2.66394 1.71426 2.32794 2.07959 2.27727C2.44404 2.22394 2.78093 2.48083 2.83159 2.84616L3.1027 4.8035L5.05915 4.53239C5.42093 4.48439 5.76048 4.73683 5.81115 5.10216C5.86181 5.46661 5.6067 5.8035 5.24137 5.85416L2.62448 6.21594C2.59337 6.2195 2.56404 6.22216 2.53293 6.22216Z"
        fill="currentColor"
      />
    </Svg>
  ),
  reloadRight: (props: IconProps) => (
    <Svg width="17" height="16" viewBox="0 0 17 16" fill="none" {...props}>
      <Path
        d="M13.8333 11.6187C12.6742 13.3244 10.7178 14.4444 8.49999 14.4444C4.94088 14.4444 2.05554 11.5591 2.05554 7.99999C2.05554 4.44088 4.94088 1.55554 8.49999 1.55554C11.1942 1.55554 13.5018 3.20888 14.4644 5.55554"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.8289 2.93774L14.4663 5.55552L11.8494 5.19374"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  rename: (props: IconProps) => (
    <Svg width="16" height="17" viewBox="0 0 16 17" fill="none" {...props}>
      <Path
        d="M9.11091 12.2778L5.83536 3.83337H5.29313L2.01758 12.2778"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.88086 10.0555H8.24975"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.2227 3.83337V13.1667"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.4453 2.05554C11.4275 2.05554 12.2231 2.8511 12.2231 3.83332"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.0004 2.05554C13.0182 2.05554 12.2227 2.8511 12.2227 3.83332"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.4453 14.9444C11.4275 14.9444 12.2231 14.1488 12.2231 13.1666"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.0004 14.9444C13.0182 14.9444 12.2227 14.1488 12.2227 13.1666"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.8887 9.16663H13.5553"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  undoCircle: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        fill="#000"
        d="M9 17a8 8 0 0 1-6.62-3.508.75.75 0 1 1 1.241-.843 6.5 6.5 0 0 0 5.38 2.851c3.584 0 6.5-2.916 6.5-6.5s-2.916-6.5-6.5-6.5a6.5 6.5 0 0 0-5.959 3.9.751.751 0 0 1-1.375-.601A8 8 0 0 1 9 1c4.411 0 8 3.589 8 8s-3.589 8-8 8"
      ></Path>
      <Path
        fill="#000"
        d="M2.287 7a.75.75 0 0 1-.742-.647l-.408-2.945a.75.75 0 1 1 1.486-.206l.305 2.202 2.201-.305a.75.75 0 0 1 .205 1.487l-2.944.407A1 1 0 0 1 2.287 7"
      ></Path>
    </Svg>
  ),
  redoCircle: (props: IconProps) => (
    <Svg width="18" height="18" fill="none" viewBox="0 0 18 18" {...props}>
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M15 13.071a7.25 7.25 0 1 1 .71-6.821"
      ></Path>
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m16.12 3.305-.408 2.945-2.944-.407"
      ></Path>
    </Svg>
  ),
  gift: (props: IconProps) => (
    <Svg width="29" height="29" viewBox="0 0 29 29" fill="none" {...props}>
      <Path
        d="M19.6992 2.47266C21.6158 2.47307 23.1709 4.02868 23.1709 5.94531C23.1707 6.67753 22.9432 7.35688 22.5557 7.91699H23.9766C25.2497 7.91717 26.2822 8.94944 26.2822 10.2227V11.7783C26.282 13.0513 25.2496 14.0838 23.9766 14.084H23.1709V22.667C23.1707 24.7998 21.4424 26.5281 19.3096 26.5283H9.19922C7.06622 26.5283 5.33807 24.7999 5.33789 22.667V14.084H4.53223C3.25905 14.084 2.2268 13.0514 2.22656 11.7783V10.2227C2.22656 8.94933 3.2589 7.91699 4.53223 7.91699H5.95312C5.56561 7.35687 5.33805 6.67755 5.33789 5.94531C5.33789 4.02854 6.89284 2.47283 8.80957 2.47266C11.208 2.4728 12.7673 4.10166 13.6768 5.54492C13.9009 5.90064 14.0925 6.25558 14.2539 6.58789C14.4154 6.25539 14.6077 5.90086 14.832 5.54492C15.7416 4.10161 17.3006 2.47266 19.6992 2.47266ZM6.83789 22.667C6.83807 23.9715 7.89465 25.0283 9.19922 25.0283H13.5039V14.084H6.83789V22.667ZM15.0039 25.0283H19.3096C20.614 25.0281 21.6707 23.9714 21.6709 22.667V14.084H15.0039V25.0283ZM4.53223 9.41699C4.08733 9.41699 3.72656 9.77776 3.72656 10.2227V11.7783C3.7268 12.223 4.08747 12.584 4.53223 12.584H13.5039V9.41699H4.53223ZM15.0039 12.584H23.9766C24.4212 12.5838 24.782 12.2229 24.7822 11.7783V10.2227C24.7822 9.77787 24.4213 9.41717 23.9766 9.41699H15.0039V12.584ZM8.80957 3.97266C7.72127 3.97283 6.83789 4.85697 6.83789 5.94531C6.8383 7.03331 7.72152 7.91682 8.80957 7.91699H13.2012C13.0181 7.46275 12.7585 6.90072 12.4082 6.34473C11.6024 5.06595 10.4381 3.9728 8.80957 3.97266ZM19.6992 3.97266C18.0706 3.97266 16.9065 5.06586 16.1006 6.34473C15.7502 6.90082 15.4907 7.46267 15.3076 7.91699H19.6992C20.7871 7.91658 21.6705 7.03316 21.6709 5.94531C21.6709 4.85711 20.7873 3.97307 19.6992 3.97266Z"
        fill="currentColor"
      />
    </Svg>
  ),
  share: (props: IconProps) => (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M12.6666 9.55554V11.7778C12.6666 12.76 11.871 13.5555 10.8888 13.5555H4.22211C3.23989 13.5555 2.44434 12.76 2.44434 11.7778V5.11109C2.44434 4.12887 3.23989 3.33331 4.22211 3.33331H7.33322"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.5557 1.55554L14.4446 4.44443L11.5557 7.33332"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.2223 4.44446H11.3334C9.36983 4.44446 7.77783 6.03646 7.77783 8.00001"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  card: (props: IconProps) => (
    <Svg width="24" height="24" fill="none" viewBox="0 0 24 24" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M2.333 9.667h19.334M5 19h14a2.667 2.667 0 0 0 2.667-2.667V7.667A2.667 2.667 0 0 0 19 5H5a2.667 2.667 0 0 0-2.667 2.667v8.666A2.667 2.667 0 0 0 5 19M5.667 15h4"
      ></Path>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M17 15h1.333"
      ></Path>
    </Svg>
  ),
  applePay: (props: IconProps) => (
    <Svg width="24" height="24" fill="none" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M2.258 4.77h19.484a2.24 2.24 0 0 1 1.595.669c.409.413.663.983.663 1.61v9.902c0 .627-.254 1.197-.663 1.61s-.974.67-1.595.67H2.258a2.24 2.24 0 0 1-1.595-.67A2.28 2.28 0 0 1 0 16.951V7.05c0-.627.254-1.197.663-1.61s.974-.67 1.595-.67m19.484.785H2.258A1.496 1.496 0 0 0 .778 7.05v9.902a1.496 1.496 0 0 0 1.48 1.494h19.484a1.496 1.496 0 0 0 1.48-1.494V7.05a1.496 1.496 0 0 0-1.48-1.494"
      ></Path>
      <Path
        fill="currentColor"
        fillRule="evenodd"
        d="M15.732 14.606v-.472c.043.011.139.011.187.011.267 0 .411-.113.5-.404 0-.005.05-.172.05-.175l-1.014-2.836h.624l.71 2.306h.011l.71-2.306h.608l-1.051 2.982c-.24.687-.518.907-1.1.907a2 2 0 0 1-.235-.013m-7.538-4.55a.95.95 0 0 0 .216-.675.93.93 0 0 0-.617.322c-.134.156-.252.41-.221.65.237.02.473-.12.622-.297m.214.343c-.344-.02-.637.197-.8.197-.165 0-.416-.187-.688-.182a1.01 1.01 0 0 0-.862.529c-.37.642-.098 1.596.261 2.119.175.259.385.544.662.534.262-.01.365-.171.683-.171s.41.17.687.165c.287-.005.467-.259.642-.518.2-.295.282-.58.287-.595-.005-.006-.554-.218-.56-.856-.004-.533.432-.787.452-.803-.246-.367-.63-.409-.764-.42zm2.993-.722c.747 0 1.268.52 1.268 1.277s-.531 1.282-1.287 1.282h-.827v1.328h-.598V9.677zm-.846 2.052h.686c.52 0 .817-.282.817-.773 0-.49-.297-.77-.814-.77h-.689zm2.27 1.03c0-.496.376-.8 1.043-.838l.769-.046v-.218c0-.315-.21-.504-.563-.504-.334 0-.542.162-.593.415h-.544c.032-.512.464-.89 1.158-.89s1.116.365 1.116.933v1.953h-.553v-.466h-.013c-.163.315-.518.514-.886.514-.55 0-.934-.345-.934-.854m1.812-.257v-.223l-.691.043c-.344.024-.54.178-.54.42s.204.41.513.41c.403 0 .718-.28.718-.65"
        clipRule="evenodd"
      ></Path>
    </Svg>
  ),
  money: (props: IconProps) => (
    <Svg width="21" height="21" viewBox="0 0 21 21" fill="none" {...props}>
      <Path
        d="M11.9045 8.5222C11.5479 7.94553 10.9768 7.80664 10.5323 7.80664C10.0645 7.80664 8.83676 8.05553 8.9512 9.23442C9.0312 10.0622 9.8112 10.37 10.4923 10.4911C11.1734 10.6122 12.1634 10.8722 12.1879 11.87C12.209 12.7133 11.4501 13.2889 10.5334 13.2889C9.77342 13.2889 9.21565 13.0333 8.92676 12.4622"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.5 7.16699V7.80699"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.5 13.29V13.8334"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.05545 4.66699C6.05545 6.66144 4.43878 8.2781 2.44434 8.2781"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.9443 4.66699C14.9443 6.66144 16.561 8.2781 18.5554 8.2781"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.05545 16.3338C6.05545 14.3393 4.43878 12.7227 2.44434 12.7227"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.9443 16.3338C14.9443 14.3393 16.561 12.7227 18.5554 12.7227"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.3332 4.66699H4.66656C3.43926 4.66699 2.44434 5.66191 2.44434 6.88921V14.1114C2.44434 15.3387 3.43926 16.3337 4.66656 16.3337H16.3332C17.5605 16.3337 18.5554 15.3387 18.5554 14.1114V6.88921C18.5554 5.66191 17.5605 4.66699 16.3332 4.66699Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  expireLock: (props: IconProps) => (
    <Svg width="25" height="24" viewBox="0 0 25 24" fill="none" {...props}>
      <Path
        d="M19.708 2L22.3747 4.66667"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.04167 2L2.375 4.66667"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.3753 20.3332C16.9777 20.3332 20.7087 16.6022 20.7087 11.9998C20.7087 7.39746 16.9777 3.6665 12.3753 3.6665C7.77295 3.6665 4.04199 7.39746 4.04199 11.9998C4.04199 16.6022 7.77295 20.3332 12.3753 20.3332Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.48333 17.8921L4.04199 20.3334"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.2666 17.8921L20.7079 20.3334"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.3753 17.3332C11.6393 17.3332 11.042 16.7345 11.042 15.9998C11.042 15.2652 11.6393 14.6665 12.3753 14.6665C13.1113 14.6665 13.7087 15.2652 13.7087 15.9998C13.7087 16.7345 13.1113 17.3332 12.3753 17.3332Z"
        fill="currentColor"
      />
      <Path
        d="M12.375 8V12.3333"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  wave: (props: IconProps) => (
    <Svg width="50" height="30" viewBox="0 0 50 30" fill="none" {...props}>
      <Rect y="10" width="2" height="5" fill="currentColor" />
      <Rect x="4" y="5" width="2" height="10" fill="currentColor" />
      <Rect x="8" width="2" height="15" fill="currentColor" />
      <Rect x="12" y="2" width="2" height="13" fill="currentColor" />
      <Rect x="16" y="8" width="2" height="7" fill="currentColor" />
      <Rect x="20" y="6" width="2" height="9" fill="currentColor" />
      <Rect x="24" y="7" width="2" height="8" fill="currentColor" />
      <Rect x="28" width="2" height="15" fill="currentColor" />
      <Rect x="32" y="9" width="2" height="6" fill="currentColor" />
      <Rect x="36" y="7" width="2" height="8" fill="currentColor" />
      <Rect x="40" y="13" width="2" height="2" fill="currentColor" />
      <Rect x="44" y="12" width="2" height="3" fill="currentColor" />
      <Rect x="48" y="13" width="2" height="2" fill="currentColor" />
      <Rect y="15" width="2" height="5" fill="currentColor" />
      <Rect x="4" y="15" width="2" height="10" fill="currentColor" />
      <Rect x="8" y="15" width="2" height="15" fill="currentColor" />
      <Rect x="12" y="15" width="2" height="13" fill="currentColor" />
      <Rect x="16" y="15" width="2" height="7" fill="currentColor" />
      <Rect x="20" y="15" width="2" height="9" fill="currentColor" />
      <Rect x="24" y="15" width="2" height="8" fill="currentColor" />
      <Rect x="28" y="15" width="2" height="15" fill="currentColor" />
      <Rect x="32" y="15" width="2" height="6" fill="currentColor" />
      <Rect x="36" y="15" width="2" height="8" fill="currentColor" />
      <Rect x="40" y="15" width="2" height="2" fill="currentColor" />
      <Rect x="44" y="15" width="2" height="3" fill="currentColor" />
      <Rect x="48" y="15" width="2" height="2" fill="currentColor" />
    </Svg>
  ),
  messageDelete: (props: IconProps) => (
    <Svg width="25" height="24" viewBox="0 0 25 24" fill="none" {...props}>
      <G clipPath="url(#clip0_6936_86448)">
        <Path
          d="M2.83301 7.66675L11.8557 12.6441C12.257 12.8654 12.7423 12.8654 13.1437 12.6441L22.1663 7.66675"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M22.1663 11.6118V6.99992C22.1663 5.52725 20.9725 4.33325 19.4997 4.33325H5.49967C4.02687 4.33325 2.83301 5.52725 2.83301 6.99992V16.9999C2.83301 18.4726 4.02687 19.6666 5.49967 19.6666H11.565"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M19.1663 22.9999C21.5596 22.9999 23.4997 21.0598 23.4997 18.6666C23.4997 16.2734 21.5596 14.3333 19.1663 14.3333C16.7731 14.3333 14.833 16.2734 14.833 18.6666C14.833 21.0598 16.7731 22.9999 19.1663 22.9999Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M16.1025 21.7308L22.2232 15.6101"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_6936_86448">
          <Rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0.5)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  ),
  document: (props: IconProps) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M7.66699 9H10.3337"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.66699 13H13.667"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20.213 8.33324H15.6663C14.9303 8.33324 14.333 7.73591 14.333 6.99991V2.46924"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20.3337 11.9213V8.88525C20.3337 8.53192 20.1937 8.19192 19.943 7.94259L14.7243 2.72392C14.4737 2.47325 14.135 2.33325 13.7817 2.33325H6.33366C4.86033 2.33325 3.66699 3.52792 3.66699 4.99992V18.9999C3.66699 20.4719 4.86033 21.6666 6.33366 21.6666H13.3403"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19.6663 19.0001V16.3334C19.6663 15.4134 18.9197 14.6667 17.9997 14.6667C17.0797 14.6667 16.333 15.4134 16.333 16.3334V19.6667C16.333 21.5081 17.825 23.0001 19.6663 23.0001C21.5077 23.0001 22.9997 21.5081 22.9997 19.6667V17.0001"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  discount: (props: IconProps) => (
    <Svg width="20" height="19" fill="none" viewBox="0 0 20 19" {...props}>
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m16.718 9.061-1.473-1.463-.007-2.075a1 1 0 0 0-1.004-.996l-2.075.007-1.473-1.463a1 1 0 0 0-1.414.005L7.809 4.55l-2.075.008a1 1 0 0 0-.996 1.003l.007 2.075-1.463 1.473a1 1 0 0 0 .005 1.414l1.473 1.463.008 2.075a1 1 0 0 0 1.003.997l2.075-.008 1.473 1.463a1 1 0 0 0 1.414-.005l1.463-1.473 2.075-.007a1 1 0 0 0 .996-1.004l-.007-2.075 1.463-1.473a1 1 0 0 0-.005-1.414"
      ></Path>
      <Path
        fill="#000"
        d="M8 8.799a1 1 0 1 0-.008-2 1 1 0 0 0 .007 2M12.013 12.785a1 1 0 1 0-.007-2 1 1 0 0 0 .007 2"
      ></Path>
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m7.76 12.05 4.485-4.516"
      ></Path>
    </Svg>
  ),
  discover: (props: IconProps) => (
    <Svg width="23" height="22" viewBox="0 0 23 22" fill="none" {...props}>
      <Path
        d="M11.4996 20.9703C17.0061 20.9703 21.4699 16.5064 21.4699 11C21.4699 5.49352 17.0061 1.02966 11.4996 1.02966C5.99316 1.02966 1.5293 5.49352 1.5293 11C1.5293 16.5064 5.99316 20.9703 11.4996 20.9703Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.9336 7.146C15.0604 7.09449 15.1961 7.1253 15.2852 7.21436C15.3778 7.30704 15.4042 7.446 15.3535 7.56396V7.56494L13.2168 12.5493C13.1923 12.6062 13.1526 12.6539 13.1025 12.688L13.0488 12.7173L8.06445 14.8521C8.02146 14.8698 7.97888 14.8794 7.93848 14.8794C7.85528 14.8793 7.77486 14.8466 7.71387 14.7856C7.62119 14.693 7.5948 14.554 7.64551 14.436V14.4351L9.78223 9.45068C9.81497 9.3748 9.87476 9.31536 9.9502 9.28271L9.94922 9.28174L14.9336 7.146Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </Svg>
  ),
  discoverActive: (props: IconProps) => (
    <Svg width="23" height="22" viewBox="0 0 23 22" fill="none" {...props}>
      <Path
        d="M11.4996 20.9703C17.0061 20.9703 21.4699 16.5064 21.4699 11C21.4699 5.49352 17.0061 1.02966 11.4996 1.02966C5.99316 1.02966 1.5293 5.49352 1.5293 11C1.5293 16.5064 5.99316 20.9703 11.4996 20.9703Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.6389 6.45714L9.65374 8.59364C9.40191 8.70217 9.20165 8.90243 9.09312 9.15482L6.95663 14.14C6.78414 14.5412 6.87458 15.0073 7.18338 15.316C7.38791 15.5206 7.66053 15.629 7.9387 15.629C8.08056 15.629 8.22385 15.6005 8.36016 15.5428L13.3453 13.4063C13.5971 13.2978 13.7974 13.0975 13.9059 12.8451L16.0424 7.85996C16.2149 7.45873 16.1245 6.99269 15.8157 6.68389C15.5069 6.3751 15.0437 6.28679 14.6389 6.45714Z"
        fill="currentColor"
      />
    </Svg>
  ),
  videoOff: (props: IconProps) => (
    <Svg width={28} height={28} viewBox="0 0 28 28" fill="none" {...props}>
      <Path
        d="M18.2773 15.9424L24.1838 18.5682C24.6987 18.7968 25.2773 18.4204 25.2773 17.8573V10.1402C25.2773 9.57706 24.6987 9.20061 24.1838 9.42928L22.7072 10.0857L21.9689 10.4139"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.83279 20.6109C6.72003 20.6109 5.60868 20.6049 5.49902 20.5932C3.93775 20.4267 2.72168 19.1052 2.72168 17.4998V10.4998C2.72168 8.78156 4.11457 7.38867 5.83279 7.38867H15.1661C16.4907 7.38867 17.6219 8.21642 18.0707 9.38285M12.8328 20.6109H15.1661C16.8843 20.6109 18.2772 19.218 18.2772 17.4998V15.7498"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.42749 26.4502L25.9597 1.96084"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  micOff: (props: IconProps) => (
    <Svg width={24} height={26} viewBox="0 0 24 26" fill="none" {...props}>
      <Path
        d="M17.0554 6.77821C17.0554 3.98611 14.792 1.72266 11.9999 1.72266C9.20779 1.72266 6.94434 3.98611 6.94434 6.77821V11.4449C6.94434 14.237 9.20779 16.5004 11.9999 16.5004C14.792 16.5004 17.0554 14.237 17.0554 11.4449V6.77821Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.9469 19.0535C3.71157 17.2724 2.27734 14.5253 2.27734 11.4453"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21.7226 11.4453C21.7226 16.8151 17.3701 21.1675 12.0003 21.1675C11.1806 21.1675 10.3857 21.0664 9.625 20.8751"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 21.166V24.2771"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.11133 23.8891L22.8891 2.11133"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  phone: () => (
    <Svg width="73" height="73" viewBox="0 0 73 73" fill="none">
      <Rect
        x="0.304688"
        y="0.291992"
        width="72"
        height="72"
        rx="36"
        fill="currentColor"
      />
      <Path
        d="M39.6569 38.6434L38.0269 40.6805C35.5027 39.1963 33.3984 37.0935 31.9156 34.5692L33.9527 32.9393C34.4441 32.5464 34.6084 31.8707 34.3527 31.2964L32.4956 27.1151C32.2199 26.4951 31.537 26.1666 30.8813 26.3366L27.3457 27.2537C26.6629 27.4322 26.2214 28.0937 26.3186 28.7922C27.5928 37.8692 34.727 45.0033 43.8053 46.279C44.5039 46.3747 45.1653 45.9333 45.3425 45.2519L46.2596 41.7162C46.4296 41.0605 46.101 40.3791 45.4825 40.1034L41.3011 38.2463C40.7268 37.9906 40.0526 38.1549 39.6583 38.6449L39.6569 38.6434Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  screenShare: (props: IconProps) => (
    <Svg width="29" height="29" viewBox="0 0 29 29" fill="none" {...props}>
      <G clipPath="url(#clip0_13450_297506)">
        <Path
          d="M27.5832 2.84417C27.2192 2.63729 26.7666 2.64351 26.4103 2.86129L23.1094 4.83995C22.8761 4.97995 22.7314 5.23351 22.7314 5.50728V7.06284C22.7314 7.33662 22.8746 7.59017 23.1094 7.73017L26.4088 9.70728C26.5939 9.81928 26.8023 9.87529 27.0108 9.87529C27.2083 9.87529 27.4059 9.82551 27.5832 9.7244C27.9488 9.51751 28.1759 9.12862 28.1759 8.70862V3.85995C28.1759 3.4384 27.9488 3.04951 27.5832 2.84417Z"
          fill="currentColor"
        />
        <Path
          d="M9.12012 26.1176C10.2992 25.7458 12.0415 25.3398 14.1757 25.3398C15.4123 25.3398 17.195 25.4767 19.2312 26.1176"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M14.1758 21.4512V25.3401"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M25.4535 12.2712V18.3394C25.4535 20.0583 24.0613 21.4505 22.3424 21.4505H6.00906C4.29017 21.4505 2.89795 20.0583 2.89795 18.3394V8.2283C2.89795 6.50941 4.29017 5.11719 6.00906 5.11719H9.89795"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M20.3982 2.00586H16.5093C15.0059 2.00586 13.7871 3.22464 13.7871 4.72808V7.83919C13.7871 9.34263 15.0059 10.5614 16.5093 10.5614H20.3982C21.9017 10.5614 23.1204 9.34263 23.1204 7.83919V4.72808C23.1204 3.22464 21.9017 2.00586 20.3982 2.00586Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_13450_297506">
          <Rect
            width="28"
            height="28"
            fill="white"
            transform="translate(0.175781 0.839844)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  ),
  stopScreenShare: (props: IconProps) => (
    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...props}>
      <Path
        d="M4.75 13.25H3.75C2.645 13.25 1.75 12.355 1.75 11.25V10"
        stroke="#FCFCFC"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.25 5V11.25C16.25 12.355 15.355 13.25 14.25 13.25H8"
        stroke="#FCFCFC"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 2.75H15.25"
        stroke="#FCFCFC"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.75 16.25C6.508 16.011 7.628 15.75 9 15.75C9.795 15.75 10.941 15.838 12.25 16.25"
        stroke="#FCFCFC"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 13.25V15.75"
        stroke="#FCFCFC"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2 16L16 2"
        stroke="#FCFCFC"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.75 7.25V2.75H6.25"
        stroke="#FCFCFC"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2 3L6.5 7.5"
        stroke="#FCFCFC"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  flipCamera: (props: IconProps) => (
    <Svg width={28} height={28} viewBox="0 0 28 28" fill="none" {...props}>
      <G clipPath="url(#clip0_1555_43053)">
        <Path
          d="M27.4074 2.00433C27.0434 1.79744 26.5908 1.80366 26.2346 2.02144L22.9337 4.00011C22.7003 4.14011 22.5557 4.39366 22.5557 4.66744V6.223C22.5557 6.49677 22.6988 6.75033 22.9337 6.89033L26.233 8.86744C26.4181 8.97944 26.6266 9.03544 26.835 9.03544C27.0326 9.03544 27.2301 8.98566 27.4074 8.88455C27.773 8.67766 28.0001 8.28877 28.0001 7.86877V3.02011C28.0001 2.59855 27.773 2.20966 27.4074 2.00433Z"
          fill="#FCFCFC"
        />
        <Path
          d="M8.94434 25.2778C10.1234 24.906 11.8657 24.5 13.9999 24.5C15.2366 24.5 17.0192 24.6369 19.0554 25.2778"
          stroke="#FCFCFC"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M14 20.6113V24.5002"
          stroke="#FCFCFC"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M25.2782 11.4313V17.4996C25.2782 19.2185 23.886 20.6107 22.1671 20.6107H5.83377C4.11488 20.6107 2.72266 19.2185 2.72266 17.4996V7.38845C2.72266 5.66957 4.11488 4.27734 5.83377 4.27734H9.72266"
          stroke="#FCFCFC"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M20.2224 1.16602H16.3336C14.8301 1.16602 13.6113 2.3848 13.6113 3.88824V6.99935C13.6113 8.50279 14.8301 9.72157 16.3336 9.72157H20.2224C21.7259 9.72157 22.9447 8.50279 22.9447 6.99935V3.88824C22.9447 2.3848 21.7259 1.16602 20.2224 1.16602Z"
          stroke="#FCFCFC"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1555_43053">
          <Rect width={28} height={28} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  ),
  flipCameraCircle: (props: IconProps) => (
    <Svg width="29" height="29" fill="none" viewBox="0 0 29 29" {...props}>
      <G
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        clipPath="url(#clip0_12254_104802)"
      >
        <Path d="m8.471 15.07-3.5-3.5-3.5 3.5"></Path>
        <Path d="M21.712 20.589a9.722 9.722 0 0 1-17.13-6.297c0-.929.131-1.828.374-2.679M20.138 13.514l3.5 3.5 3.5-3.5"></Path>
        <Path d="M6.897 7.995a9.722 9.722 0 0 1 17.13 6.297c0 .9-.123 1.773-.352 2.6"></Path>
      </G>
      <Defs>
        <ClipPath id="clip0_12254_104802">
          <Path fill="#fff" d="M.305.292h28v28h-28z"></Path>
        </ClipPath>
      </Defs>
    </Svg>
  ),
  endCall: (props: IconProps) => (
    <Svg width="23" height="23" fill="none" viewBox="0 0 23 23" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m14.657 13.643-1.63 2.037a17.2 17.2 0 0 1-6.111-6.11l2.037-1.63a1.384 1.384 0 0 0 .4-1.644l-1.857-4.18a1.386 1.386 0 0 0-1.615-.78l-3.535.918a1.393 1.393 0 0 0-1.027 1.538A20.54 20.54 0 0 0 18.805 21.28a1.393 1.393 0 0 0 1.538-1.027l.917-3.536a1.385 1.385 0 0 0-.777-1.613L16.3 13.246a1.386 1.386 0 0 0-1.643.399z"
      ></Path>
    </Svg>
  ),
  reply: (props: IconProps) => (
    <Svg width="17" height="17" viewBox="0 0 17 17" fill="none" {...props}>
      <Path
        d="M2.96582 6.39453H11.6325C13.4734 6.39453 14.9658 7.88698 14.9658 9.72786C14.9658 11.5688 13.4734 13.0612 11.6325 13.0612H8.29915"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.07693 9.50738L2.96582 6.39627L6.07693 3.28516"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  reddit: (props: IconProps) => (
    <Svg width="1em" height="1em" viewBox="0 0 256 256" {...props}>
      <Circle cx="128" cy="128" r="128" fill="#ff4500" />
      <Path
        fill="#fff"
        d="M213.15 129.22c0-10.376-8.391-18.617-18.617-18.617a18.74 18.74 0 0 0-12.97 5.189c-12.818-9.157-30.368-15.107-49.9-15.87l8.544-39.981l27.773 5.95c.307 7.02 6.104 12.667 13.278 12.667c7.324 0 13.275-5.95 13.275-13.278c0-7.324-5.95-13.275-13.275-13.275c-5.188 0-9.768 3.052-11.904 7.478l-30.976-6.562c-.916-.154-1.832 0-2.443.458c-.763.458-1.22 1.22-1.371 2.136l-9.464 44.558c-19.837.612-37.692 6.562-50.662 15.872a18.74 18.74 0 0 0-12.971-5.188c-10.377 0-18.617 8.391-18.617 18.617c0 7.629 4.577 14.037 10.988 16.939a33.6 33.6 0 0 0-.458 5.646c0 28.686 33.42 52.036 74.621 52.036c41.202 0 74.622-23.196 74.622-52.036a35 35 0 0 0-.458-5.646c6.408-2.902 10.985-9.464 10.985-17.093M85.272 142.495c0-7.324 5.95-13.275 13.278-13.275c7.324 0 13.275 5.95 13.275 13.275s-5.95 13.278-13.275 13.278c-7.327.15-13.278-5.953-13.278-13.278m74.317 35.251c-9.156 9.157-26.553 9.768-31.588 9.768c-5.188 0-22.584-.765-31.59-9.768c-1.371-1.373-1.371-3.51 0-4.883c1.374-1.371 3.51-1.371 4.884 0c5.8 5.8 18.008 7.782 26.706 7.782s21.058-1.983 26.704-7.782c1.374-1.371 3.51-1.371 4.884 0c1.22 1.373 1.22 3.51 0 4.883m-2.443-21.822c-7.325 0-13.275-5.95-13.275-13.275s5.95-13.275 13.275-13.275c7.327 0 13.277 5.95 13.277 13.275c0 7.17-5.95 13.275-13.277 13.275"
      />
    </Svg>
  ),
  ban: (props: IconProps) => (
    <Svg width="16" height="17" viewBox="0 0 16 17" fill="none" {...props}>
      <Path
        d="M3.44287 13.0574L12.5495 3.95068"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.00011 14.9444C11.5593 14.9444 14.4446 12.0592 14.4446 8.49999C14.4446 4.94082 11.5593 2.05554 8.00011 2.05554C4.44094 2.05554 1.55566 4.94082 1.55566 8.49999C1.55566 12.0592 4.44094 14.9444 8.00011 14.9444Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
};
