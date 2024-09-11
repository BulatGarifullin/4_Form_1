import CheckIcon from './icons/CheckIcon';
import CloseIcon from './icons/CloseIcon';
import styles from './app.module.css';
import { useState, useEffect } from 'react';

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [checkedTodos, setCheckedTodos] = useState({});

	useEffect(() => {
		setIsLoading(true);
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	const handleBtn = (id) => {
		setCheckedTodos((prevCheckedTodos) => ({
			...prevCheckedTodos,
			[id]: !prevCheckedTodos[id],
		}));
	};

	return (
		<div className={styles.app}>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				<>
					<h1>Список дел:</h1>
					{todos.map(({ id, title }) => (
						<div className={styles.todo} key={id}>
							<p
								className={`${styles.todoContent} ${checkedTodos[id] ? styles.checked : ''}`}
							>
								{title}
							</p>
							<div className={styles.todoBtn}>
								<button
									onClick={() => handleBtn(id)}
									className={`${checkedTodos[id] ? styles.checkedBtn : ''}`}
									disabled={checkedTodos[id]}
								>
									<CheckIcon />
								</button>
								<button
									onClick={() => handleBtn(id)}
									className={`${!checkedTodos[id] ? styles.checkedBtn : ''}`}
									disabled={
										!checkedTodos[id] ||
										checkedTodos[id] === undefined
									}
								>
									<CloseIcon />
								</button>
							</div>
						</div>
					))}
				</>
			)}
		</div>
	);
};
