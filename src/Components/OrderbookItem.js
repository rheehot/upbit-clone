import React from "react";
import styled from "styled-components";
import isEqual from "react-fast-compare";

const OrderLi = styled.li`
  display: flex;
  width: 100%;
  height: 45px;
  &:nth-last-child() {
    border-bottom: none;
  }
  font-size: 0.8rem;
  @media ${({ theme }) => theme.mobileS} {
    font-size: 0.7rem;
  }
`;

const OrderAmount = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  width: 50%;
  border: 1px solid ${({ borderColor }) => borderColor};
  padding-right: 10px;
  margin-top: -1px;
  margin-left: -1px;
  text-align: right;
`;

const OrderAmountSize = styled.div`
  position: absolute;
  width: ${({ witdhSize }) => witdhSize};
  right: 0;
  height: 70%;
  background-color: ${({ bgColor }) => bgColor};
`;

const OrderPriceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  border: 1px solid ${({ borderColor }) => borderColor};
  margin-top: -1px;
  margin-left: -1px;
  text-align: right;
  color: ${({ fontColor }) => fontColor};
  background-color: ${({ bgColor }) => bgColor};

  @media ${({ theme }) => theme.mobileM} {
    flex-direction: column;
  }
`;

const OrderPrice = styled.strong``;

const OrderPrcieRatio = styled.span`
  padding-left: 13px;
`;

const OrderbookItem = ({
  theme,
  price,
  size,
  maxOrderSize,
  type,
  changeRate24Hour,
  index,
}) => {
  // const scrollRef = useRef();
  // useEffect(() => {
  //   if (index === 7 && type === "ask") {
  //     const parentNode = scrollRef.current.parentNode;
  //     const parentAbsoluteTop = window.pageYOffset + parentNode.offsetTop;
  //     const absoluteTop = window.pageYOffset + scrollRef.current.offsetTop;

  //     const relativeTop = absoluteTop - parentAbsoluteTop;

  //     scrollRef.current.parentNode.scrollTop = relativeTop;
  //   }
  // }, []);

  return type === "ask" ? (
    <OrderLi theme={theme}>
      <OrderAmount borderColor={theme.lightGray}>
        {size}
        <OrderAmountSize
          witdhSize={`${Math.floor((size / maxOrderSize) * 100 - 10)}%`}
          bgColor={theme.skyBlue2}
        />
      </OrderAmount>
      <OrderPriceContainer
        theme={theme}
        fontColor={
          changeRate24Hour > 0
            ? theme.priceUp
            : +changeRate24Hour < 0
            ? theme.priceDown
            : "black"
        }
        borderColor={theme.lightGray}
        bgColor={theme.skyBlue1}
      >
        <OrderPrice>{price.toLocaleString()}</OrderPrice>
        <OrderPrcieRatio>{`${changeRate24Hour}%`}</OrderPrcieRatio>
      </OrderPriceContainer>
    </OrderLi>
  ) : (
    <OrderLi>
      <OrderAmount amountAlign={"left"} borderColor={theme.lightGray}>
        {size}
        <OrderAmountSize
          witdhSize={`${Math.floor((size / maxOrderSize) * 100 - 10)}%`}
          bgColor={theme.lightPink2}
        />
      </OrderAmount>
      <OrderPriceContainer
        theme={theme}
        fontColor={
          changeRate24Hour > 0
            ? theme.priceUp
            : +changeRate24Hour < 0
            ? theme.priceDown
            : "black"
        }
        borderColor={theme.lightGray}
        bgColor={theme.lightPink1}
      >
        <OrderPrice>{price.toLocaleString()}</OrderPrice>
        <OrderPrcieRatio>{`${changeRate24Hour}%`}</OrderPrcieRatio>
      </OrderPriceContainer>
    </OrderLi>
  );
};

export default React.memo(OrderbookItem, isEqual);
