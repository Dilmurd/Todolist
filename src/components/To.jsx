import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaTrash, FaEdit } from 'react-icons/fa';

function To() {
    const [text, setText] = useState("");
    const [data, setData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        let date = new Date();
        let time = `${date.getHours()}:${date.getMinutes()}`;

        if (isEditing) {
            setData(data.map(item =>
                item.id === currentId
                    ? { ...item, text, updatedTime: time }
                    : item
            ));
            setIsEditing(false);
            setCurrentId(null);
        } else {
            let newTodo = {
                id: uuidv4(),
                text,
                time,       
                updatedTime: null 
            };
            setData([...data, newTodo]);
        }

        setText("");
    };

    const handleDelete = (id) => {
        setData(data.filter(item => item.id !== id));
    };

    const handleEdit = (id) => {
        const todoToEdit = data.find(item => item.id === id);
        setText(todoToEdit.text);
        setIsEditing(true);
        setCurrentId(id);
    };

    return (
        <div className='w-[500px] p-4 border border-slate-400 mx-auto mt-8 bg-gray-100 rounded shadow-lg'>
            <form onSubmit={handleSubmit} className='flex gap-2 mb-4'>
                <input value={text} onChange={(e) => setText(e.target.value)} type="text" placeholder="Add your todo" className='flex-1 p-2 border border-gray-400 rounded outline-none'
                />
                <button
                    className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                >
                    {isEditing ? "Update" : "Add"}
                </button>
            </form>
            <div>
                {data.map((item) => (
                    <div key={item.id} className='py-4 border-b border-slate-300 flex justify-between items-center'>
                        <div>
                            <b>{item.text}</b>
                            <div className='text-gray-500 text-sm'>
                                Created at: {item.time}
                                {item.updatedTime && (
                                    <span> | Updatid at: {item.updatedTime}</span>
                                )}
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <button onClick={() => handleEdit(item.id)} className='text-blue-500 hover:text-blue-600'>
                                <FaEdit />
                            </button>
                            <button onClick={() => handleDelete(item.id)} className='text-red-500 hover:text-red-600'>
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default To;
