import { useEffect, useState } from "react";
import {
  requestJoinGroup,
  getJoinStatus
} from "../services/groupService";

export default function JoinGroupButton({ groupId }) {
  const [status, setStatus] = useState("NONE");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStatus();
  }, []);

  const loadStatus = async () => {
    try {
      const { data } = await getJoinStatus(groupId);
      setStatus(data.status || "NONE");
    } catch (err) {
      console.log(err);
    }
  };

  const handleJoin = async () => {
    setLoading(true);

    try {
      const { data } = await requestJoinGroup(groupId);
      setStatus(data.status);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const renderButton = () => {
    switch (status) {
      case "NONE":
        return (
          <button onClick={handleJoin} disabled={loading}>
            {loading ? "Enviando..." : "Solicitar entrada"}
          </button>
        );

      case "PENDING":
        return (
          <button disabled>
            🟡 Solicitação enviada
          </button>
        );

      case "ACCEPTED":
        return (
          <button disabled>
            🟢 Você faz parte do grupo
          </button>
        );

      case "REJECTED":
        return (
          <button onClick={handleJoin}>
            🔴 Solicitar novamente
          </button>
        );

      default:
        return null;
    }
  };

  return <div>{renderButton()}</div>;
}