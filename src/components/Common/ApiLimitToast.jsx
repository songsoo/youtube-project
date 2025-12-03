
import { useApiAvailable } from './../../context/ApiCheckContextProvider';

export default function ApiLimitToast() {
    const { isApiAvailable } = useApiAvailable();
    return (
        <>
            {!isApiAvailable && (
                <div className="fixed z-50 bottom-1/12 left-1/24 flex py-2 rounded-xl bg-neutral-200 px-5 text-black items-center">
                    <p className="font-semibold">😢 API Data 사용량을 모두 사용했어요</p>
                </div>
            )}
        </>
    );
}
