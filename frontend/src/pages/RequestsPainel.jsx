import { useEffect, useState } from "react";
import api from "../services/api";

export default function RequestsPanel() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadRequests();
    }, []);

    async function loadRequests() {
        try {
            const res = await api.get(
                "/groups/join-requests"
            );

            setRequests(res.data.requests || []);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    async function acceptRequest(requestId) {
        try {
            await api.put(
                `/groups/join-requests/${requestId}/accept`
            );

            setRequests((prev) =>
                prev.filter(
                    (request) => request.id !== requestId
                )
            );

            alert("Solicitação aceita!");

        } catch (error) {
            console.log(error);

            alert("Erro ao aceitar solicitação");
        }
    }

    async function rejectRequest(requestId) {
        try {
            await api.put(
                `/groups/join-requests/${requestId}/reject`
            );

            setRequests((prev) =>
                prev.filter(
                    (request) => request.id !== requestId
                )
            );

            alert("Solicitação recusada!");

        } catch (error) {
            console.log(error);

            alert("Erro ao recusar solicitação");
        }
    }

    if (loading) {
        return <p style={styles.loading}>Carregando...</p>;
    }

    return (
        <div style={styles.container}>
            <h1>🔔 Solicitações Recebidas</h1>

            {requests.length === 0 ? (
                <p>Nenhuma solicitação pendente.</p>
            ) : (
                <div style={styles.list}>
                    {requests.map((request) => (
                        <div
                            key={request.id}
                            style={styles.card}
                        >
                            <h3>{request.studentName}</h3>

                            <p>
                                Grupo: {request.groupSubject}
                            </p>

                            <p>
                                Data:{" "}
                                {new Date(
                                    request.createdAt
                                ).toLocaleDateString()}
                            </p>

                            <div style={styles.actions}>
                                <button
                                    style={styles.acceptButton}
                                    onClick={() =>
                                        acceptRequest(request.id)
                                    }
                                >
                                    Aceitar
                                </button>

                                <button
                                    style={styles.rejectButton}
                                    onClick={() =>
                                        rejectRequest(request.id)
                                    }
                                >
                                    Recusar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        padding: 30,
        fontFamily: "Arial",
        background: "#f5f6fa",
        minHeight: "100vh"
    },

    loading: {
        padding: 30
    },

    list: {
        display: "flex",
        flexDirection: "column",
        gap: 20,
        marginTop: 20
    },

    card: {
        background: "#fff",
        padding: 20,
        borderRadius: 12,
        boxShadow: "0px 4px 12px rgba(0,0,0,0.08)"
    },

    actions: {
        display: "flex",
        gap: 10,
        marginTop: 15
    },

    acceptButton: {
        flex: 1,
        padding: 10,
        border: "none",
        borderRadius: 8,
        background: "#28a745",
        color: "#fff",
        cursor: "pointer",
        fontWeight: "bold"
    },

    rejectButton: {
        flex: 1,
        padding: 10,
        border: "none",
        borderRadius: 8,
        background: "#dc3545",
        color: "#fff",
        cursor: "pointer",
        fontWeight: "bold"
    }
};