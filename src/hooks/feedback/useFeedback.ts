export const useFeedback = () => {
  const sendFeedback = async (message) => {
    await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
  };

  return { sendFeedback };
};
