import styled from "styled-components";

/**
 * Normally we have to thinkg about our components when
 * it comes to whether or not we want to make a brand new
 * component to wrap it or
 * if we want to target some other way.
 * The way we want to target the shopping-icon, we know
 * there is some styling to be applied and we can directly
 * target our own components including the svg components.
 */
import { ReactComponent as ShoppingSvg } from "../../assets/shopping-bag.svg";

export const ShoppingIcon = styled(ShoppingSvg)`
  width: 24px;
  height: 24px;
`;

export const CartIconContainer = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const ItemCount = styled.span`
  position: absolute;
  font-size: 10px;
  font-weight: bold;
  bottom: 12px;
`;
