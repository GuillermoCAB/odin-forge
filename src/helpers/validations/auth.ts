import { LOCALSTORAGE_KEYS, productConfig } from "@/constants";
import { AuthState } from "@/types";

/**
 * Validates if user has access to actual product.
 *
 * @returns true if user has access, false otherwise.
 */
export function userHasAccessToProduct(): boolean {
  const authData = localStorage.getItem(LOCALSTORAGE_KEYS.AUTH);
  if (!authData) return false;

  const parsedAuthData: AuthState = JSON.parse(authData);
  if (!parsedAuthData.user) return false;

  return parsedAuthData.user.subscriptions.some(
    (sub) => sub.product_id === productConfig._id
  );
}
