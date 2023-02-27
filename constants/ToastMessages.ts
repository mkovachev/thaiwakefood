export const ToastMessages = () => {

  const FOOD_ADDED = 'Food has been successfully added to your favorites.';
  const FOOD_UPDATED = 'Food has been successfully updated.';
  const FOOD_REMOVED = 'Food has been successfully removed to your favorites.';

  // General
  const SERVER_ERROR = 'A server error occurred.';
  const UNAUTHORIZED = 'Sorry, you are not authorized to perform this action.';

  return {
    FOOD_ADDED,
    FOOD_UPDATED,
    FOOD_REMOVED,
    UNAUTHORIZED,
    SERVER_ERROR
  };
};
