import { GenericError } from '@/shared/ui/errors/generic-error';

import { AuthLayout } from '@/layouts';

export default function NotFoundPage() {
    return (
        <AuthLayout>
            <GenericError
                width="100%"
                height="100%"
                errorMessage="Такой страницы не существует"
            />
        </AuthLayout>
    );
}
