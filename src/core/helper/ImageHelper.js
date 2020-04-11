import React from 'react';
import { API } from '../../backend';

const ImageHelper = ({ item }) => {
	const imageUrl = item
		? `${API}product/photo/${item._id}`
		: 'https://images.pexels.com/photos/3844000/pexels-photo-3844000.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500';
	return (
		<div>
			<div className="rounded p-2">
				<img
					src={imageUrl}
					alt="photo"
					style={{ maxHeight: '100%', maxWidth: '100%' }}
					className="mb-3 rounded"
				/>
			</div>
		</div>
	);
};

export default ImageHelper;
