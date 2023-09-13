import { useEffect } from 'react';

export function TasksList() {
  useEffect(() => {
    console.log('page loaded');
  }, []);

  return <div>TasksList</div>;
}