import { getDoctors } from "@/app/actions/doctor-actions";
import DoctorsClient from "@/components/doctors/DoctorsClient";


type Props = {
    searchParams: Promise<{
        search?: string;
        specialization?: string;
    }>;
};

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 8;

export default async function DoctorsPage({ searchParams }: Props) {
    const { search, specialization } = await searchParams;

    const initialData = await getDoctors(DEFAULT_PAGE, DEFAULT_LIMIT, undefined, search, specialization);
    console.log('search', search);
    console.log('specialization', specialization);

    console.log('initial data', initialData)

    return (
        <section className="relative overflow-hidden py-10">
            <div className="pointer-events-none absolute -left-40 top-10 hidden h-96 w-96 rounded-full bg-main/15 blur-3xl md:block" />
            <div className="pointer-events-none absolute -right-40 bottom-0 hidden h-[500px] w-[500px] rounded-full bg-main/15 blur-3xl md:block" />

            <div className="mx-auto max-w-7xl px-4">
                <div className="mb-10 max-w-2xl mx-auto text-center">
                    <span className="text-sm font-semibold uppercase tracking-[0.2em] text-main">
                        All Doctors
                    </span>
                    <h1 className="mt-3 text-3xl font-bold sm:text-4xl ">
                        Find Your <span className="text-main">Specialist</span>
                    </h1>
                    <p className="mt-3 text-base leading-8 text-foreground/60 ">
                        Browse verified doctors across every department and book an
                        appointment that fits your schedule.
                    </p>
                </div>

                {/* Client component takes over from here: renders the grid and
            re-calls the server action whenever the page changes */}
                <DoctorsClient initialData={initialData} limit={DEFAULT_LIMIT} />
            </div>
        </section>
    );
}