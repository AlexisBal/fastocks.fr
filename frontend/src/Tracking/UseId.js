import { useState } from 'react';

export default function useId() {
  const getId = () => {
    var idString = sessionStorage.getItem('id');
    if (!idString) {
      idString = localStorage.getItem('id');
    }
    const userId = JSON.parse(idString);
    return userId?.id
  };

  const [id, setId] = useState(getId());

  const saveLocalId = userId => {
    localStorage.setItem('id', JSON.stringify(userId));
    setId(userId.id);
  };

  const saveSessionId = userId => {
    sessionStorage.setItem('id', JSON.stringify(userId));
    setId(userId.id);
  };

  return {
    setLocalId: saveLocalId,
    setSessionId: saveSessionId,
    id
  }
}