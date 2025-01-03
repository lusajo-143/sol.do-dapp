'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { ExplorerLink } from '../cluster/cluster-ui';
import { WalletButton } from '../solana/solana-provider';
import { AppHero, ellipsify } from '../ui/ui-layout';
import { useTodoProgram } from './todo-data-access';
import {BasicCreate, TodoProgram, TodoCreate, TodoInitiate, TodoList} from './todo-ui';

export default function TodoFeature() {
  const { publicKey } = useWallet();
  const { programId } = useTodoProgram();

  return publicKey ? (
    <div>

        <div className="flex flex-col gap-4 text-center">
            <h1 className="font-bold text-6xl text-white">SO.TODO</h1>

            <div className="flex gap-4 text-center">
                <span className="text-sm text-white">Program Address: </span>
                <ExplorerLink
                    className="text-accent-700 underline"
                    path={`account/${programId}`}
                    label={ellipsify(programId.toString())}
                />
            </div>
        </div>

        {/*<AppHero*/}
        {/*  title="Todo"*/}
        {/*  subtitle={'Run the program by clicking the "Run program" button.'}*/}
      {/*>*/}
      {/*  <p className="mb-6">*/}
      {/*    <ExplorerLink*/}
      {/*      path={`account/${programId}`}*/}
      {/*      label={ellipsify(programId.toString())}*/}
      {/*    />*/}
      {/*  </p>*/}
      {/*  /!*<TodoCreate />*!/*/}
      {/*  /!*<TodoInitiate />*!/*/}
      {/*</AppHero>*/}
      {/*  <TodoList />*/}
      {/*<TodoProgram />*/}
    </div>
  ) : (
    <div className="max-w-4xl mx-auto">
      <div className="hero py-[64px]">
        <div className="hero-content text-center">
          <WalletButton className="btn btn-primary" />
        </div>
      </div>
    </div>
  );
}
