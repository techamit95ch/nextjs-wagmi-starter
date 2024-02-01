'use client';

import { Button } from '@/components/ui';
import { Accordion } from '@/components/ui/Accordion';

export default function Home() {
	return (
		<body>
			<Accordion
				type="single"
				className="w-8"
				data={[
					{ content: 'akshdakjs', header: 'dfsfs' },
					{ content: 'akshdakjs', header: 'dfsfs' },
					{ content: 'akshdakjs', header: 'dfsfs' },
				]}
			/>
			<Button onClick={() => console.log('akjkj')} variant="ghost">
				kljdsljl ksdhfjkhsd kjsdhfkjsdhkjfs kjhsdhkjdshhkjsdkjds
			</Button>
		</body>
	);
}
