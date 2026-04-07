"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    AlertTriangle,
    ArrowUpRight,
    CheckCircle2,
    Droplets,
    GraduationCap,
    HeartPulse,
    Landmark,
    MapPinned,
    Search,
    ShieldAlert,
    TrendingUp,
    UserRound,
    Wallet,
    Waves,
    Wrench,
} from "lucide-react";

const overview = {
    constituency: "Palayamkottai",
    district: "Tirunelveli, Tamil Nadu",
    mla: "M. Abdul Wahab",
    party: "DMK",
    electedYear: 2021,
    score: 64,
    verdict: "Moderate delivery · Rising complaints",
    updatedAt: "Updated 2 hours ago",
    microInsights: [
        {
            type: "warning",
            text: "Water-related complaints up 18% this month",
        },
        {
            type: "success",
            text: "2 infrastructure projects marked completed recently",
        },
    ],
};

const scoreCards = [
    {
        key: "funds",
        label: "Funds",
        value: 72,
        icon: Wallet,
        tone: "bg-amber-500/15 text-amber-300 border-amber-500/20",
        desc: "Allocation vs visible completion signal",
    },
    {
        key: "development",
        label: "Development",
        value: 66,
        icon: Wrench,
        tone: "bg-sky-500/15 text-sky-300 border-sky-500/20",
        desc: "Roads, water, schools, health coverage in the news",
    },
    {
        key: "sentiment",
        label: "Sentiment",
        value: 48,
        icon: ShieldAlert,
        tone: "bg-rose-500/15 text-rose-300 border-rose-500/20",
        desc: "Citizen complaints vs praise across public signals",
    },
];

const projects = [
    {
        id: 1,
        name: "Ward 14 Road Upgrade",
        budget: "₹50L",
        status: "Completed",
        area: "Ward 14",
        source: "District infrastructure note",
        category: "Roads",
    },
    {
        id: 2,
        name: "Underground Drainage Expansion",
        budget: "₹1.2Cr",
        status: "Ongoing",
        area: "Melapalayam border stretch",
        source: "Tender portal + news mention",
        category: "Water",
    },
    {
        id: 3,
        name: "Government School Renovation",
        budget: "₹22L",
        status: "Completed",
        area: "Palayamkottai central",
        source: "Education dept release",
        category: "Education",
    },
    {
        id: 4,
        name: "Primary Health Centre Equipment Upgrade",
        budget: "₹35L",
        status: "Unclear",
        area: "KTC Nagar zone",
        source: "Health procurement note",
        category: "Health",
    },
    {
        id: 5,
        name: "Water Pipeline Improvement",
        budget: "₹90L",
        status: "Ongoing",
        area: "Perumalpuram side",
        source: "Local news + civic complaint mentions",
        category: "Water",
    },
];

const newsFeed = [
    {
        id: 1,
        title: "New drinking water upgrade announced for Tirunelveli region",
        tag: "Positive",
        category: "Water",
        date: "Apr 3, 2026",
        summary: "Regional reporting suggests fresh pipeline and supply upgrade activity affecting Palayamkottai-adjacent zones.",
    },
    {
        id: 2,
        title: "Residents continue to report drainage overflow in low-lying streets",
        tag: "Negative",
        category: "Water",
        date: "Apr 5, 2026",
        summary: "Complaint-heavy coverage points to unresolved drainage stress after recent rains.",
    },
    {
        id: 3,
        title: "Government school facilities receive renovation support",
        tag: "Positive",
        category: "Education",
        date: "Mar 29, 2026",
        summary: "Classroom repair and campus improvement activity covered in local civic and education reporting.",
    },
    {
        id: 4,
        title: "Traffic bottlenecks and road patchwork draw criticism from commuters",
        tag: "Negative",
        category: "Roads",
        date: "Apr 1, 2026",
        summary: "Road usability is still mixed, with citizens pointing to short-lived repairs and congestion.",
    },
    {
        id: 5,
        title: "Health outreach camp receives positive turnout",
        tag: "Neutral",
        category: "Health",
        date: "Apr 4, 2026",
        summary: "A modest positive signal for public-facing health engagement, though infrastructure signal remains incomplete.",
    },
];

const citizenPulse = [
    {
        id: 1,
        text: "Drainage issue still unresolved for months near our street.",
        tone: "Complaint",
        area: "Low-lying residential pocket",
        source: "Public post",
    },
    {
        id: 2,
        text: "Hospital service has improved, but waiting time is still messy.",
        tone: "Mixed",
        area: "PHC catchment",
        source: "Public review",
    },
    {
        id: 3,
        text: "Water supply is better than last year, but not reliable every week.",
        tone: "Mixed",
        area: "Perumalpuram",
        source: "Citizen mention",
    },
    {
        id: 4,
        text: "School compound looks much better now after repairs.",
        tone: "Praise",
        area: "Palayamkottai central",
        source: "Local comment",
    },
    {
        id: 5,
        text: "Garbage pickup is inconsistent and no one seems accountable.",
        tone: "Complaint",
        area: "Mixed wards",
        source: "Public complaint",
    },
];

const mapPins = [
    {
        id: 1,
        title: "Drainage stress cluster",
        status: "Problem",
        x: "22%",
        y: "58%",
        detail: "Repeated complaint density around overflow-prone streets.",
    },
    {
        id: 2,
        title: "School renovation signal",
        status: "Good",
        x: "55%",
        y: "36%",
        detail: "Positive education infrastructure mentions.",
    },
    {
        id: 3,
        title: "Water pipeline work",
        status: "Average",
        x: "72%",
        y: "48%",
        detail: "Ongoing project with mixed citizen sentiment.",
    },
    {
        id: 4,
        title: "Road patchwork complaints",
        status: "Problem",
        x: "42%",
        y: "72%",
        detail: "Commuter complaints remain elevated.",
    },
];

const mlaProfile = {
    party: "DMK",
    ageBand: "Incumbent MLA",
    winYear: 2021,
    incumbency: "1st term in current cycle",
    assetsTrend: [28, 35, 42, 51],
    publicActivity: [42, 58, 61, 64],
    trustFlags: [
        "Track affidavit, assembly participation, and narrative-performance gap here.",
        "This panel is built to connect later with election, affidavit, and assembly data.",
    ],
};

const statusTone = {
    Completed: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
    Ongoing: "bg-amber-500/15 text-amber-300 border-amber-500/20",
    Unclear: "bg-zinc-500/15 text-zinc-300 border-zinc-500/20",
    Positive: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
    Negative: "bg-rose-500/15 text-rose-300 border-rose-500/20",
    Neutral: "bg-sky-500/15 text-sky-300 border-sky-500/20",
    Praise: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
    Complaint: "bg-rose-500/15 text-rose-300 border-rose-500/20",
    Mixed: "bg-amber-500/15 text-amber-300 border-amber-500/20",
    Good: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
    Average: "bg-amber-500/15 text-amber-300 border-amber-500/20",
    Problem: "bg-rose-500/15 text-rose-300 border-rose-500/20",
};

function SectionTitle({ title, subtitle }) {
    return (
        <div className="flex items-start justify-between gap-4">
            <div>
                <h2 className="text-xl font-semibold tracking-tight text-white">{title}</h2>
                <p className="mt-1 text-sm text-zinc-400">{subtitle}</p>
            </div>
        </div>
    );
}

function MetricCard({ label, value, icon: Icon, desc, tone }) {
    return (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-zinc-800 bg-zinc-950/70 shadow-2xl shadow-black/20">
                <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-sm text-zinc-400">{label}</p>
                            <div className="mt-2 flex items-end gap-2">
                                <span className="text-3xl font-bold text-white">{value}</span>
                                <span className="pb-1 text-xs text-zinc-500">/ 100</span>
                            </div>
                            <p className="mt-2 max-w-xs text-sm text-zinc-400">{desc}</p>
                        </div>
                        <div className={`rounded-2xl border p-3 ${tone}`}>
                            <Icon className="h-5 w-5" />
                        </div>
                    </div>
                    <Progress value={value} className="mt-4 h-2 bg-zinc-900" />
                </CardContent>
            </Card>
        </motion.div>
    );
}

function StatusBadge({ value }) {
    return <Badge className={`border ${statusTone[value] || "bg-zinc-800 text-zinc-200 border-zinc-700"}`}>{value}</Badge>;
}

function TinySparkline({ data, colorClass = "bg-sky-400" }) {
    const max = Math.max(...data);
    return (
        <div className="flex h-16 items-end gap-2">
            {data.map((v, i) => (
                <div
                    key={i}
                    className={`w-full rounded-t-md ${colorClass} opacity-${Math.max(40, Math.round((v / max) * 100))}`}
                    style={{ height: `${(v / max) * 100}%` }}
                />
            ))}
        </div>
    );
}

function OverviewPanel() {
    return (
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <Card className="overflow-hidden border-zinc-800 bg-gradient-to-br from-zinc-950 via-zinc-950 to-zinc-900">
                <CardContent className="p-6 md:p-8">
                    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <Badge className="border-zinc-700 bg-zinc-900 text-zinc-200">{overview.constituency}</Badge>
                                <Badge className="border-zinc-800 bg-zinc-950 text-zinc-400">{overview.updatedAt}</Badge>
                            </div>
                            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">{overview.score}/100</h1>
                            <p className="mt-2 text-lg text-zinc-300">{overview.verdict}</p>
                            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-zinc-400">
                                <span className="inline-flex items-center gap-2"><Landmark className="h-4 w-4" /> {overview.constituency}, {overview.district}</span>
                                <span className="inline-flex items-center gap-2"><UserRound className="h-4 w-4" /> {overview.mla}</span>
                            </div>
                        </div>
                        <div className="grid min-w-[220px] gap-3">
                            {overview.microInsights.map((item) => (
                                <div key={item.text} className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4">
                                    <div className="flex items-start gap-3">
                                        {item.type === "warning" ? (
                                            <AlertTriangle className="mt-0.5 h-4 w-4 text-amber-300" />
                                        ) : (
                                            <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
                                        )}
                                        <p className="text-sm text-zinc-300">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-zinc-800 bg-zinc-950/70">
                <CardHeader>
                    <CardTitle className="text-white">Fast read</CardTitle>
                    <CardDescription className="text-zinc-400">The point is not perfect truth. The point is observable signal.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
                        <p className="text-sm font-medium text-zinc-200">Weakest layer</p>
                        <p className="mt-2 text-2xl font-semibold text-rose-300">Citizen Sentiment</p>
                        <p className="mt-1 text-sm text-zinc-400">Complaint velocity still outweighs praise.</p>
                    </div>
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
                        <p className="text-sm font-medium text-zinc-200">Strongest layer</p>
                        <p className="mt-2 text-2xl font-semibold text-amber-300">Funds Signal</p>
                        <p className="mt-1 text-sm text-zinc-400">Visible project progress is better than the public mood suggests.</p>
                    </div>
                    <Button className="w-full rounded-2xl bg-white text-black hover:bg-zinc-200">Explore full intelligence <ArrowUpRight className="ml-2 h-4 w-4" /></Button>
                </CardContent>
            </Card>
        </div>
    );
}

function ScoresPanel() {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            {scoreCards.map(({ key, ...card }) => (
                <MetricCard key={key} {...card} />
            ))}
        </div>
    );
}

function MoneyPanel() {
    const summary = useMemo(() => {
        const total = projects.length;
        const completed = projects.filter((p) => p.status === "Completed").length;
        const ongoing = projects.filter((p) => p.status === "Ongoing").length;
        const unclear = projects.filter((p) => p.status === "Unclear").length;
        return { total, completed, ongoing, unclear };
    }, []);

    return (
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <Card className="border-zinc-800 bg-zinc-950/70">
                <CardHeader>
                    <CardTitle className="text-white">Follow the money</CardTitle>
                    <CardDescription className="text-zinc-400">A simple proxy first. Fancy governance theater can come later.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
                            <p className="text-sm text-zinc-400">Tracked projects</p>
                            <p className="mt-2 text-2xl font-semibold text-white">{summary.total}</p>
                        </div>
                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
                            <p className="text-sm text-zinc-400">Completed</p>
                            <p className="mt-2 text-2xl font-semibold text-emerald-300">{summary.completed}</p>
                        </div>
                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
                            <p className="text-sm text-zinc-400">Ongoing</p>
                            <p className="mt-2 text-2xl font-semibold text-amber-300">{summary.ongoing}</p>
                        </div>
                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
                            <p className="text-sm text-zinc-400">Unclear</p>
                            <p className="mt-2 text-2xl font-semibold text-zinc-300">{summary.unclear}</p>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
                        <p className="text-sm text-zinc-400">Takeaway</p>
                        <p className="mt-2 text-sm text-zinc-300">This section is designed for later hookup to automated tender, PDF, and news extraction. Right now it gives you the product spine.</p>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-zinc-800 bg-zinc-950/70">
                <CardHeader>
                    <CardTitle className="text-white">Project tracker</CardTitle>
                    <CardDescription className="text-zinc-400">Tap-level cards. Less manifesto, more evidence.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {projects.map((project) => (
                            <div key={project.id} className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 transition hover:border-zinc-700">
                                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                                    <div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <p className="font-medium text-white">{project.name}</p>
                                            <StatusBadge value={project.status} />
                                        </div>
                                        <p className="mt-2 text-sm text-zinc-400">{project.area} · {project.category}</p>
                                        <p className="mt-2 text-sm text-zinc-500">Source: {project.source}</p>
                                    </div>
                                    <div className="rounded-2xl border border-zinc-800 px-3 py-2 text-sm text-zinc-200">{project.budget}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function NewsPanel() {
    const [filter, setFilter] = useState("All");
    const filters = ["All", "Roads", "Water", "Health", "Education"];

    const filtered = filter === "All" ? newsFeed : newsFeed.filter((item) => item.category === filter);

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
                {filters.map((f) => (
                    <Button
                        key={f}
                        variant={filter === f ? "default" : "outline"}
                        className={filter === f ? "rounded-2xl bg-white text-black hover:bg-zinc-200" : "rounded-2xl border-zinc-800 bg-zinc-950 text-zinc-300 hover:bg-zinc-900"}
                        onClick={() => setFilter(f)}
                    >
                        {f}
                    </Button>
                ))}
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
                {filtered.map((item) => (
                    <Card key={item.id} className="border-zinc-800 bg-zinc-950/70">
                        <CardContent className="p-5">
                            <div className="flex flex-wrap items-center gap-2">
                                <StatusBadge value={item.tag} />
                                <Badge className="border-zinc-800 bg-zinc-900 text-zinc-300">{item.category}</Badge>
                                <span className="text-xs text-zinc-500">{item.date}</span>
                            </div>
                            <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                            <p className="mt-2 text-sm text-zinc-400">{item.summary}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

function CitizenPanel() {
    const [query, setQuery] = useState("");
    const [toneFilter, setToneFilter] = useState("All");

    const tones = ["All", "Complaint", "Mixed", "Praise"];
    const filtered = citizenPulse.filter((item) => {
        const matchesTone = toneFilter === "All" || item.tone === toneFilter;
        const hay = `${item.text} ${item.area} ${item.source}`.toLowerCase();
        const matchesQuery = hay.includes(query.toLowerCase());
        return matchesTone && matchesQuery;
    });

    return (
        <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
            <Card className="border-zinc-800 bg-zinc-950/70">
                <CardHeader>
                    <CardTitle className="text-white">People are saying</CardTitle>
                    <CardDescription className="text-zinc-400">This is where PR starts sweating.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
                        <p className="text-sm text-zinc-400">Sentiment score</p>
                        <p className="mt-2 text-3xl font-bold text-white">48 / 100</p>
                        <p className="mt-2 text-sm text-zinc-400">Complaints still dominate the public surface area.</p>
                    </div>
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
                        <p className="text-sm text-zinc-400">Top issue</p>
                        <p className="mt-2 text-lg font-semibold text-rose-300">Water + drainage reliability</p>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-zinc-800 bg-zinc-950/70">
                <CardHeader>
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                            <CardTitle className="text-white">Signal stream</CardTitle>
                            <CardDescription className="text-zinc-400">Complaint, praise, mixed. Humans are messy. Good.</CardDescription>
                        </div>
                        <div className="relative w-full max-w-xs">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                            <Input
                                placeholder="Search area or issue"
                                className="rounded-2xl border-zinc-800 bg-zinc-900 pl-9 text-zinc-100 placeholder:text-zinc-500"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {tones.map((tone) => (
                            <Button
                                key={tone}
                                variant={toneFilter === tone ? "default" : "outline"}
                                className={toneFilter === tone ? "rounded-2xl bg-white text-black hover:bg-zinc-200" : "rounded-2xl border-zinc-800 bg-zinc-950 text-zinc-300 hover:bg-zinc-900"}
                                onClick={() => setToneFilter(tone)}
                            >
                                {tone}
                            </Button>
                        ))}
                    </div>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[360px] pr-4">
                        <div className="space-y-3">
                            {filtered.map((item) => (
                                <div key={item.id} className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <StatusBadge value={item.tone} />
                                        <span className="text-xs text-zinc-500">{item.area}</span>
                                    </div>
                                    <p className="mt-3 text-sm leading-6 text-zinc-200">“{item.text}”</p>
                                    <p className="mt-2 text-xs text-zinc-500">Source: {item.source}</p>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}

function MapPanel() {
    const [selected, setSelected] = useState(mapPins[0]);

    return (
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <Card className="border-zinc-800 bg-zinc-950/70">
                <CardHeader>
                    <CardTitle className="text-white">Map view</CardTitle>
                    <CardDescription className="text-zinc-400">Fake map for now. Real map later. No need to marry the API on date one.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="relative h-[420px] overflow-hidden rounded-3xl border border-zinc-800 bg-[radial-gradient(circle_at_top,_rgba(39,39,42,0.8),_rgba(9,9,11,1))]">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
                        <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-black/50 px-3 py-2 text-xs text-zinc-300 backdrop-blur">
                            <MapPinned className="h-4 w-4" /> Palayamkottai signal map
                        </div>
                        {mapPins.map((pin) => (
                            <button
                                key={pin.id}
                                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur transition hover:scale-105 ${statusTone[pin.status]}`}
                                style={{ left: pin.x, top: pin.y }}
                                onClick={() => setSelected(pin)}
                            >
                                {pin.title}
                            </button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="border-zinc-800 bg-zinc-950/70">
                <CardHeader>
                    <CardTitle className="text-white">Selected signal</CardTitle>
                    <CardDescription className="text-zinc-400">Click a pin. Judge the story yourself.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
                        <div className="flex items-center gap-2">
                            <StatusBadge value={selected.status} />
                        </div>
                        <h3 className="mt-3 text-xl font-semibold text-white">{selected.title}</h3>
                        <p className="mt-2 text-sm text-zinc-400">{selected.detail}</p>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-1">
                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 text-sm text-zinc-300">
                            🔴 Problem = complaint-heavy cluster
                        </div>
                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 text-sm text-zinc-300">
                            🟡 Average = work visible, outcome unclear
                        </div>
                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 text-sm text-zinc-300">
                            🟢 Good = positive project or service signal
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function ProfilePanel() {
    return (
        <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
            <Card className="border-zinc-800 bg-zinc-950/70">
                <CardHeader>
                    <CardTitle className="text-white">MLA profile</CardTitle>
                    <CardDescription className="text-zinc-400">Keep it sharp, not gossipy.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
                        <p className="text-sm text-zinc-400">Name</p>
                        <p className="mt-1 text-lg font-semibold text-white">{overview.mla}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
                            <p className="text-sm text-zinc-400">Party</p>
                            <p className="mt-1 text-lg font-semibold text-white">{mlaProfile.party}</p>
                        </div>
                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
                            <p className="text-sm text-zinc-400">Elected</p>
                            <p className="mt-1 text-lg font-semibold text-white">{mlaProfile.winYear}</p>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
                        <p className="text-sm text-zinc-400">Incumbency</p>
                        <p className="mt-1 text-sm text-zinc-200">{mlaProfile.incumbency}</p>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-zinc-800 bg-zinc-950/70">
                    <CardHeader>
                        <CardTitle className="text-white">Assets trend placeholder</CardTitle>
                        <CardDescription className="text-zinc-400">Hook to affidavit data later.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <TinySparkline data={mlaProfile.assetsTrend} colorClass="bg-amber-400" />
                        <p className="mt-4 text-sm text-zinc-400">A simple chart placeholder so the UI is ready before the data grows a spine.</p>
                    </CardContent>
                </Card>

                <Card className="border-zinc-800 bg-zinc-950/70">
                    <CardHeader>
                        <CardTitle className="text-white">Public activity placeholder</CardTitle>
                        <CardDescription className="text-zinc-400">Assembly and public record layer later.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <TinySparkline data={mlaProfile.publicActivity} colorClass="bg-sky-400" />
                        <p className="mt-4 text-sm text-zinc-400">This is where questions asked, debates, attendance, and media activity can land.</p>
                    </CardContent>
                </Card>

                <Card className="border-zinc-800 bg-zinc-950/70 md:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-white">Trust flags</CardTitle>
                        <CardDescription className="text-zinc-400">Not judgment. Just structured suspicion.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {mlaProfile.trustFlags.map((flag) => (
                            <div key={flag} className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4 text-sm text-zinc-300">
                                {flag}
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default function MLALensUIPrototype() {
    return (
        <div className="min-h-screen bg-black text-zinc-100">
            <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1 text-xs text-zinc-400">
                            <TrendingUp className="h-3.5 w-3.5" /> MLA Lens · Constituency Intelligence System
                        </div>
                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">See what your MLA actually does</h1>
                        <p className="mt-2 max-w-2xl text-sm text-zinc-400 md:text-base">
                            A live, evidence-first civic intelligence layer for Palayamkottai. Because campaign slogans are cheap and drainage is not.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Button className="rounded-2xl bg-white text-black hover:bg-zinc-200">Compare constituencies</Button>
                        <Button variant="outline" className="rounded-2xl border-zinc-800 bg-zinc-950 text-zinc-200 hover:bg-zinc-900">Download brief</Button>
                    </div>
                </div>

                <OverviewPanel />

                <div className="mt-8">
                    <ScoresPanel />
                </div>

                <div className="mt-8">
                    <Tabs defaultValue="money" className="w-full">
                        <TabsList className="grid w-full grid-cols-5 rounded-2xl bg-zinc-950 p-1">
                            <TabsTrigger value="money" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-black">Money</TabsTrigger>
                            <TabsTrigger value="news" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-black">News</TabsTrigger>
                            <TabsTrigger value="citizens" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-black">Citizens</TabsTrigger>
                            <TabsTrigger value="map" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-black">Map</TabsTrigger>
                            <TabsTrigger value="profile" className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-black">Profile</TabsTrigger>
                        </TabsList>

                        <TabsContent value="money" className="mt-6">
                            <SectionTitle title="Funds and project visibility" subtitle="A blunt proxy for where the money seems to be going." />
                            <div className="mt-4">
                                <MoneyPanel />
                            </div>
                        </TabsContent>

                        <TabsContent value="news" className="mt-6">
                            <SectionTitle title="News intelligence" subtitle="Signal extraction from public reporting." />
                            <div className="mt-4">
                                <NewsPanel />
                            </div>
                        </TabsContent>

                        <TabsContent value="citizens" className="mt-6">
                            <SectionTitle title="Citizen pulse" subtitle="This is the part that hurts more than a press release." />
                            <div className="mt-4">
                                <CitizenPanel />
                            </div>
                        </TabsContent>

                        <TabsContent value="map" className="mt-6">
                            <SectionTitle title="Geographic signal layer" subtitle="Soon real pins. For now, the UX spine." />
                            <div className="mt-4">
                                <MapPanel />
                            </div>
                        </TabsContent>

                        <TabsContent value="profile" className="mt-6">
                            <SectionTitle title="MLA profile and trust layer" subtitle="Structured transparency beats vibes." />
                            <div className="mt-4">
                                <ProfilePanel />
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                <div className="mt-10 grid gap-4 md:grid-cols-4">
                    <Card className="border-zinc-800 bg-zinc-950/70">
                        <CardContent className="flex items-center gap-3 p-4">
                            <Droplets className="h-5 w-5 text-amber-300" />
                            <div>
                                <p className="text-sm text-zinc-400">Top risk</p>
                                <p className="font-medium text-white">Water reliability</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-zinc-800 bg-zinc-950/70">
                        <CardContent className="flex items-center gap-3 p-4">
                            <GraduationCap className="h-5 w-5 text-emerald-300" />
                            <div>
                                <p className="text-sm text-zinc-400">Positive signal</p>
                                <p className="font-medium text-white">School improvements</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-zinc-800 bg-zinc-950/70">
                        <CardContent className="flex items-center gap-3 p-4">
                            <HeartPulse className="h-5 w-5 text-sky-300" />
                            <div>
                                <p className="text-sm text-zinc-400">Watchlist</p>
                                <p className="font-medium text-white">Health infra proof</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-zinc-800 bg-zinc-950/70">
                        <CardContent className="flex items-center gap-3 p-4">
                            <Waves className="h-5 w-5 text-rose-300" />
                            <div>
                                <p className="text-sm text-zinc-400">Narrative gap</p>
                                <p className="font-medium text-white">Delivery vs complaints</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
