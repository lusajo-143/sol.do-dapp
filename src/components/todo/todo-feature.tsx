'use client';

import {useWallet} from '@solana/wallet-adapter-react';
import {ExplorerLink} from '../cluster/cluster-ui';
import {WalletButton} from '../solana/solana-provider';
import {ellipsify} from '../ui/ui-layout';
import {useTodoProgram} from './todo-data-access';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHandPointer} from "@fortawesome/free-solid-svg-icons";
import {Rubik_Puddles} from 'next/font/google'
import {TodoInitiate, TodoInput, TodoList} from "@/components/todo/todo-ui";

const rubik = Rubik_Puddles({subsets: ['hebrew'], weight: '400'})

export default function TodoFeature() {
  const { publicKey } = useWallet();
  const { programId } = useTodoProgram();

  return publicKey ? (
    <div className="bg-green-500 h-full flex flex-col gap-2 justify-between">

        <div>
            <div className="flex flex-col gap-4 text-center">
            <span className={rubik.className}>
                <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                  SOL.DO
              </h1>
            </span>

                <div className="flex gap-4 text-center items-center">
                    <span className="text-sm">Program Address: </span>
                    <div className="flex gap-1 items-center">
                        <ExplorerLink
                            className="text-accent-700 underline"
                            path={`account/${programId}`}
                            label={ellipsify(programId.toString())}
                        />
                        <FontAwesomeIcon className="text-accent-700 text-xs animate-pulse -rotate-45"
                                         icon={faHandPointer}/>
                    </div>
                </div>
            </div>

            <TodoList/>
        </div>

        <div>
            <TodoInput />
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

        {/*</AppHero>*/}
        {/*  <TodoList />*/}
        {/*<TodoProgram />*/}
    </div>
  ) : (
      <div className="max-w-4xl mx-auto">
          <div className="hero py-[64px]">
              <div className="hero-content text-center">
                  <WalletButton className="btn btn-primary"/>
              </div>
          </div>
      </div>
  );
}
