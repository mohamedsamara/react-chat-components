import { Chat } from "lib/types";
import useStore from "lib/stores";
import MsgList from "./MsgList";

const Msgs = ({ chat }: { chat: Chat }) => {
  const { getChatMsgsById } = useStore();
  const msgs = getChatMsgsById(chat.id);
  return <MsgList msgs={msgs} />;
};

export default Msgs;
