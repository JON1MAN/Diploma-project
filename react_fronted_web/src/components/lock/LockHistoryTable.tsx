import {LockHistoryTableDTO} from "../../interfaces/lock_history/LockHistoryTableDTO";
import React from "react";

const LockHistoryTable: React.FC<LockHistoryTableDTO> = ({ history }) => (
    <div className="bg-white">
        <table className="w-full border-collapse">
            <thead>
            <tr className="bg-gray-100">
                <th className="border p-3 text-left">Time</th>
                <th className="border p-3 text-left">Card Name</th>
                <th className="border p-3 text-left">Card Code</th>
            </tr>
            </thead>
            <tbody>
            {history.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="border p-3">{entry.time}</td>
                    <td className="border p-3">{entry.cardName}</td>
                    <td className="border p-3">{entry.cardCode}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);

export default LockHistoryTable;